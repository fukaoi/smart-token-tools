import bs from "bs58";
import {
  createGenericFile,
  generateSigner,
  percentAmount,
  transactionBuilder,
} from "@metaplex-foundation/umi";
import {
  createV1,
  mintV1,
  mplTokenMetadata,
  TokenStandard,
} from "@metaplex-foundation/mpl-token-metadata";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { findAssociatedTokenPda } from "@metaplex-foundation/mpl-toolbox";
import { fetchClusterApiUrl, SPL_TOKEN_2022_PROGRAM_ID } from "~/utils//config";
import { TokenMetadata } from "~/types";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { WalletAdapter } from "@solana/wallet-adapter-base";

export const mintToken = async (
  walletAdapter: WalletAdapter,
  metadata: TokenMetadata
): Promise<{ signature: string; mint: string }> => {
  const umi = createUmi(fetchClusterApiUrl(metadata.cluster));
  console.debug("# mintToken() metadata: ", metadata);
  console.debug("# cluster url: ", fetchClusterApiUrl(metadata.cluster));
  umi.use(walletAdapterIdentity(walletAdapter));
  umi.use(mplTokenMetadata());
  umi.use(irysUploader());
  const mint = generateSigner(umi);
  const token = findAssociatedTokenPda(umi, {
    mint: mint.publicKey,
    owner: umi.identity.publicKey,
    tokenProgramId: SPL_TOKEN_2022_PROGRAM_ID,
  });

  console.log(metadata.file);
  const genericFile = createGenericFile(
    metadata.file.buffer,
    metadata.file.displayName,
    {
      contentType: "text/plain",
    }
  );
  // const uploadedImageUrl = await umi.uploader.upload([genericFile]);
  const uploadedImageUrl = await umi.uploader.upload([metadata.file]);
  console.debug("# uploadedJsonUrl: ", uploadedImageUrl);

  const uploadedJsonUrl = await umi.uploader.uploadJson({
    name: metadata.name,
    symbol: metadata.symbol,
    image: uploadedImageUrl,
  });
  console.debug("# uploadedJsonUrl: ", uploadedJsonUrl);

  const transaction = transactionBuilder()
    .add(
      createV1(umi, {
        mint,
        authority: umi.identity,
        name: metadata.name,
        symbol: metadata.symbol,
        decimals: metadata.decimals,
        uri: uploadedJsonUrl,
        sellerFeeBasisPoints: percentAmount(5.5),
        splTokenProgram: SPL_TOKEN_2022_PROGRAM_ID,
        tokenStandard: TokenStandard.Fungible,
      })
    )
    .add(
      mintV1(umi, {
        mint: mint.publicKey,
        token,
        tokenOwner: umi.identity.publicKey,
        authority: umi.identity,
        amount: metadata.totalSupply,
        splTokenProgram: SPL_TOKEN_2022_PROGRAM_ID,
        tokenStandard: TokenStandard.Fungible,
      })
    );
  const res = await transaction.sendAndConfirm(umi);
  return {
    signature: bs.encode(res.signature),
    mint: mint.publicKey.toString(),
  };
};

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
import {
  findAssociatedTokenPda,
  setComputeUnitLimit,
  setComputeUnitPrice,
} from "@metaplex-foundation/mpl-toolbox";
import { fetchClusterApiUrl, SPL_TOKEN_2022_PROGRAM_ID } from "~/utils//config";
import type { TokenMetadata } from "~/types";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import {
  WalletAdapterNetwork,
  type WalletAdapter,
} from "@solana/wallet-adapter-base";

const SELLER_FEE_BASIS_POINTS = 0;

export const mintToken = async (
  walletAdapter: WalletAdapter,
  metadata: TokenMetadata,
  callbackHandle?: (message: string) => void
): Promise<{ signature: string; mint: string }> => {
  const rpcUrl = metadata.customClusterUrl
    ? metadata.customClusterUrl
    : fetchClusterApiUrl(metadata.cluster);
  const umi = createUmi(rpcUrl);
  console.debug("# mintToken() metadata: ", metadata);
  console.debug("# rpc url: ", rpcUrl);
  umi.use(walletAdapterIdentity(walletAdapter));
  umi.use(mplTokenMetadata());
  umi.use(irysUploader({ timeout: 60000, priceMultiplier: 1.1 }));
  const mint = generateSigner(umi);
  const token = findAssociatedTokenPda(umi, {
    mint: mint.publicKey,
    owner: umi.identity.publicKey,
    tokenProgramId: SPL_TOKEN_2022_PROGRAM_ID,
  });

  let jsonUrl = "";
  if (metadata.file) {
    callbackHandle?.("Image Uploading");

    const genericFile = createGenericFile(
      metadata.file.buffer,
      metadata.file.displayName,
      {
        contentType: metadata.file.contentType
          ? metadata.file.contentType
          : "image/png",
      }
    );
    const uploadedImageUrl = await umi.uploader.upload([genericFile]);
    const imageUrl = fetchGatewayUrl(metadata.cluster, uploadedImageUrl[0]);
    console.debug("# image url: ", imageUrl);
    callbackHandle?.("Metadata Uploading");

    const uploadedJsonUrl = await umi.uploader.uploadJson({
      name: metadata.name,
      symbol: metadata.symbol,
      image: imageUrl,
    });
    jsonUrl = fetchGatewayUrl(metadata.cluster, uploadedJsonUrl);
    console.debug("# json url: ", jsonUrl);
  } else if (metadata.metadataJsonUrl) {
    jsonUrl = metadata.metadataJsonUrl;
  } else {
    throw new Error("No file or metadataJsonUrl provided");
  }

  callbackHandle?.("Minting SPL Token");

  const transaction = transactionBuilder()
    .add(setComputeUnitPrice(umi, { microLamports: 50000 }))
    .add(
      createV1(umi, {
        mint,
        authority: umi.identity,
        name: metadata.name,
        symbol: metadata.symbol,
        decimals: metadata.decimals,
        uri: jsonUrl,
        sellerFeeBasisPoints: percentAmount(SELLER_FEE_BASIS_POINTS),
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
        amount: calculateAmount(metadata.totalSupply, metadata.decimals),
        splTokenProgram: SPL_TOKEN_2022_PROGRAM_ID,
        tokenStandard: TokenStandard.Fungible,
      })
    );

  const { blockhash, lastValidBlockHeight } =
    await umi.rpc.getLatestBlockhash();
  const res = await transaction.sendAndConfirm(umi, {
    send: { maxRetries: 5, commitment: "confirmed", skipPreflight: true },
    confirm: {
      strategy: {
        type: "blockhash",
        blockhash,
        lastValidBlockHeight,
      },
    },
  });
  return {
    signature: bs.encode(res.signature),
    mint: mint.publicKey.toString(),
  };
};

const calculateAmount = (amount: number, mintDecimal: number): number => {
  return amount * 10 ** mintDecimal;
};

const fetchGatewayUrl = (cluster: string, uploadedUrl: string): string => {
  console.log(cluster, WalletAdapterNetwork.Devnet);
  if (cluster === WalletAdapterNetwork.Devnet) {
    return uploadedUrl.replace("arweave.net", "gateway.irys.xyz");
  }
  return uploadedUrl;
};

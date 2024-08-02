import bs from 'bs58';
import {
  generateSigner,
  Keypair,
  keypairIdentity,
  percentAmount,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  createV1,
  mintV1,
  mplTokenMetadata,
  TokenStandard,
} from '@metaplex-foundation/mpl-token-metadata';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { findAssociatedTokenPda } from '@metaplex-foundation/mpl-toolbox';
import { SPL_TOKEN_2022_PROGRAM_ID } from '~/utils//config';
import { TokenMetadata } from '~/types';

export namespace Solana {
  export const tokenMint = async (
    cluster: string,
    owner: Keypair,
    metadata: TokenMetadata
  ) => {
    const umi = createUmi(cluster);
    umi.use(keypairIdentity(owner));
    umi.use(mplTokenMetadata());
    const mint = generateSigner(umi);
    const token = findAssociatedTokenPda(umi, {
      mint: mint.publicKey,
      owner: umi.identity.publicKey,
      tokenProgramId: SPL_TOKEN_2022_PROGRAM_ID,
    });
    const transaction = transactionBuilder()
      .add(
        createV1(umi, {
          mint,
          authority: umi.identity,
          name: metadata.name,
          symbol: metadata.symbol,
          decimals: metadata.decimals,
          uri: 'https://ipfs.filebase.io/ipfs/QmSjBz2up2FHwSBYgpqa3G5u4B1jMFcK3azYTU8eb6gDmU',
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
    return bs.encode(res.signature);
  };
}

import {Phantom} from '@solana-suite/nft';
import { Metaplex } from '@solana-suite/phantom';
import { Node, Result } from '@solana-suite/shared';
import { Transaction } from '@solana/web3.js';

export const nftMint = async (
  file: string,
  name: string,
  description: string,
  royalty: number,
  phantom: Phantom,
) => {
  console.log(file);
  console.log(name);
  console.log(description);
  console.log(royalty);
  console.log(phantom);
  await Metaplex.mint(
    {
      filePath: file,
      name,
      description,
      symbol: 'ATONOY',
      royalty,
      storageType: 'nftStorage',
    },
    phantom
  );
};

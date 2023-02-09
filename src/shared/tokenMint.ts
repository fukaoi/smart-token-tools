import { PhantomSplToken } from '@solana-suite/phantom';

export const mintToken = async (
  filePath: ArrayBuffer,
  name: string,
  symbol: string,
  walletAddress: string,
  cluster: string,
  totalSupply: number,
  decimals: number,
) => {
  const royalty = 100;
  const storageType = 'nftStorage';

  //todo: merge nft mint
  const res = await PhantomSplToken.mint(
    {
      name,
      symbol,
      filePath,
      royalty,
      storageType,
    },
    walletAddress.toPublicKey(),
    cluster,
    totalSupply,
    decimals,
    window.solana,
  );
  return res;
};

export const addMinting = async (
  tokenKey: string,
  walletAddress: string,
  cluster: string,
  totalSupply: number,
  decimals: number,
) => {
  const res = await PhantomSplToken.add(
    tokenKey.toPublicKey(),
    walletAddress.toPublicKey(),
    cluster,
    totalSupply,
    decimals,
    window.solana,
  );
  return res;
};

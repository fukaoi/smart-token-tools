import { PhantomSplToken } from '@solana-suite/phantom';

export const mintToken = async (
  walletAddress: string,
  cluster: string,
  totalSupply: number,
  decimals: number,
) => {
  const res = await PhantomSplToken.mint(
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

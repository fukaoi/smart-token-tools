import { PhantomSplToken } from '@solana-suite/phantom';

export const mintToken = async (walletAddress: string, postData: FormValues) => {
  const res = await PhantomSplToken.mint(
    walletAddress.toPublicKey(),
    postData.cluster,
    postData.totalSupply,
    postData.decimals,
    window.solana,
  );
  return res;
};

export const addMinting = async (
  tokenKey: string,
  walletAddress: string,
  postData: FormValues,
) => {
  const res = await PhantomSplToken.add(
    tokenKey.toPublicKey(),
    walletAddress.toPublicKey(),
    postData.cluster,
    postData.totalSupply,
    postData.decimals,
    window.solana,
  );
  return res;
};

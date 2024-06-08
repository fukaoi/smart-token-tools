import { PhantomSplToken } from '@solana-suite/phantom';
import { ValidatorError } from '@solana-suite/utils';

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

  const mint = await PhantomSplToken.mint(
    {
      name,
      symbol,
      filePath,
      royalty,
      storageType,
    },
    walletAddress,
    cluster,
    totalSupply,
    decimals,
    window.solana,
  );

  mint.match(
    (ok: any) => {
      console.debug('mint: ', ok);
    },
    (err: Error) => {
      console.error('err:', err);
      if ('details' in err) {
        console.error((err as ValidatorError).details);
      }
    },
  );
  return mint.unwrap();
};

export const addMinting = async (
  tokenKey: string,
  walletAddress: string,
  cluster: string,
  totalSupply: number,
  decimals: number,
) => {
  const mint = await PhantomSplToken.add(
    tokenKey,
    walletAddress,
    cluster,
    totalSupply,
    decimals,
    window.solana,
  );

  mint.match(
    (ok: any) => {
      console.debug('mint: ', ok);
    },
    (err: Error) => {
      console.error('err:', err);
      if ('details' in err) {
        console.error((err as ValidatorError).details);
      }
    },
  );
  return mint.unwrap();
};

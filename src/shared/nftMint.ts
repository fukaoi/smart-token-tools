import { MetaplexPhantom } from '@solana-suite/phantom';
import { ValidatorError } from '@solana-suite/nft';

export const addPublicKey = (creators: any) => {
  const res = creators.map(
    (item: { address: string; share: number; verified: boolean }) => {
      const address = item.address.toPublicKey();
      return {
        address,
        share: item.share,
        verified: item.verified,
      };
    },
  );
  return res;
};

export const creatorMint = async (
  filePath: ArrayBuffer,
  name: string,
  symbol: string,
  description: string,
  royalty: number,
  creators: any,
  cluster: string,
) => {
  const mint = await MetaplexPhantom.mint(
    {
      filePath,
      name,
      symbol,
      description,
      royalty,
      creators,
      storageType: 'nftStorage',
      options: {
        powered_by: {
          name: 'Atonoy.inc',
          uri: 'https://atonoy.co',
        },
      },
    },
    cluster,
    window.solana,
  );

  mint.match(
    (ok: any) => {
      console.log('mint: ', ok);
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

export const noCreatorMint = async (
  filePath: ArrayBuffer,
  name: string,
  symbol: string,
  description: string,
  royalty: number,
  cluster: string,
) => {
  const mint = await MetaplexPhantom.mint(
    {
      filePath,
      name,
      symbol,
      description,
      royalty,
      storageType: 'nftStorage',
      options: {
        powered_by: {
          name: 'Atonoy.inc',
          uri: 'https://atonoy.co',
        },
      },
    },
    cluster,
    window.solana,
  );

  mint.match(
    (ok: any) => {
      console.log('mint: ', ok);
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

import { PhantomMetaplex } from '@solana-suite/phantom';
import {
  ValidatorError,
  InputCreators,
  MetadataProperties,
} from '@solana-suite/shared-metaplex';
import { MediaFiles } from '../types/context';

export const addPublicKey = (originalData: any): InputCreators[] => {
  const creators = originalData.map(
    (item: { address: string; share: number }) => {
      const address = item.address;
      return {
        address,
        share: item.share,
        authority: '',
      };
    },
  );
  return creators;
};

export const creatorMint = async (
  filePath: ArrayBuffer,
  name: string,
  symbol: string,
  description: string,
  royalty: number,
  cluster: string,
  creators?: InputCreators[],
  properties?: MediaFiles[],
) => {
  const mint = await PhantomMetaplex.mint(
    {
      filePath,
      name,
      symbol,
      description,
      royalty,
      creators,
      storageType: 'nftStorage',
      properties,
    },
    cluster,
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

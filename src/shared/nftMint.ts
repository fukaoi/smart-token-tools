import { PhantomMetaplex } from '@solana-suite/phantom';
import { ValidatorError } from '@solana-suite/utils';
import { MediaFiles } from '../types/context';

const toMetadataProperties = (input: MediaFiles[]) => {
  return input.map(file => {
    return {
      type: file.fileType,
      filePath: file.buffer,
      fileName: file.fileName,
    };
  });
};

export const addCreator = (originalData: any): UserSideOutput.Creators[] => {
  const creators = originalData.map(
    (item: { address: string; share: number }) => {
      const address = item.address;
      return {
        address,
        share: item.share,
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
  creators?: UserSideOutput.Creators[],
  mediaFiles?: MediaFiles[],
) => {
  const storageType = 'nftStorage';
  const properties: InfraSideInput.Properties = {};
  if (mediaFiles && mediaFiles?.length > 0) {
    const converted = toMetadataProperties(mediaFiles);
    properties.files = converted;
  }

  if (creators && creators.length < 1) {
    creators = undefined;
  }

  console.log(creators);

  const mint = await PhantomMetaplex.mint(
    {
      filePath,
      name,
      symbol,
      description,
      royalty,
      creators: creators,
      storageType,
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

import { ControllerRenderProps } from 'react-hook-form';
import { createContext, Dispatch, SetStateAction } from 'react';
import { GenericFile } from '@metaplex-foundation/umi';

export type TokenMetadata = {
  cluster: string;
  customClusterUrl?: string;
  name: string;
  symbol: string;
  imagePreview?: string;
  file: GenericFile;
  issueType: string;
  totalSupply: number;
  decimals: number;
  tokenAddress?: string;
};

export type Creator = {
  address: string;
  share: number;
};

export type NFTMetadata = {
  cluster: string;
  name: string;
  symbol: string;
  description: string;
  imagePreview?: string;
  file: GenericFile;
  creators: Creator[];
  royalty?: number;
  control?: any;
  field?: ControllerRenderProps;
  optional?: any;
};

export type MediaFiles = {
  buffer: ArrayBuffer;
  fileName: string;
  fileType: string;
};

export const MediaFilesContext = createContext<{
  mediaFiles: MediaFiles[];
  setMediaFiles: Dispatch<SetStateAction<MediaFiles[]>>;
}>(
  {} as {
    mediaFiles: MediaFiles[];
    setMediaFiles: Dispatch<SetStateAction<MediaFiles[]>>;
  }
);

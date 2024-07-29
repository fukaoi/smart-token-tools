import { ControllerRenderProps } from 'react-hook-form';
import { createContext, Dispatch, SetStateAction } from 'react';

export type TokenFormValues = {
  cluster: string;
  name: string;
  symbol: string;
  imagePreview?: string;
  issueType: string;
  totalSupply: number;
  decimals: number;
  tokenKey?: string;
};

export type Creator = {
  address: string;
  share: number;
};

export type NFTFormValues = {
  cluster: string;
  nftName: string;
  symbol: string;
  description: string;
  imagePreview?: string;
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
  },
);

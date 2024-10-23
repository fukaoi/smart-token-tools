import type { ControllerRenderProps } from "react-hook-form";
import { createContext, type Dispatch, type SetStateAction } from "react";
import type { GenericFile } from "@metaplex-foundation/umi";

export type TokenMetadata = {
  cluster: string;
  customClusterUrl: string;
  name: string;
  symbol: string;
  imagePreview?: string;
  metadataJsonUrl?: string;
  file?: GenericFile;
  totalSupply: number;
  decimals: number;
};

export type Creator = {
  address: string;
  share: number;
};

export type NFTMetadata = {
  cluster: string;
  customClusterUrl?: string;
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

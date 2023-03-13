import { createContext, Dispatch, SetStateAction } from 'react';

export type MediaFiles = {
  buffer: ArrayBuffer[];
  fileName: string;
  fileType: string;
};

export const MediaFilesContext = createContext(
  {} as {
    mediaFiles: MediaFiles[];
    setMediaFiles: Dispatch<SetStateAction<MediaFiles[]>>;
  },
);



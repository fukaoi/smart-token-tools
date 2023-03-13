import { createContext, Dispatch, SetStateAction } from 'react';
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

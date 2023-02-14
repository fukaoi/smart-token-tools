import { Box, Button, ImageList, ImageListItem } from '@mui/material';
import { FC, useState } from 'react';
import DescriptionTypography from '../typography/DescriptionTypography';
import NoImage from '../../assets/no-image-available.jpg';
import { FileUpload } from '../../shared/fileUpload';

export type MediaFileUploadUIProps = {
  mediaPreview: any;
  setErrorModal: any;
  setMediaFilePreview: MediaFilePreviewFunc;
  setMediaFileBuffer: (buffer: ArrayBuffer) => void;
};

type MediaFilePreviewFunc = (file: File | string | undefined) => void;

const MediaFileUploadUI: FC<MediaFileUploadUIProps> = ({
  mediaPreview,
  setMediaFilePreview: setMediaPreview,
  setMediaFileBuffer,
  setErrorModal,
}) => {
  const description = 'All file types can be uploaded';
  const warnDescription =
    'This file type cant display image preview, but can upload blockchain storage';
  const [message, setMessage] = useState(description);
  const setMediaFile = (file: File) => {
    if (FileUpload.isImagePreviewFileType(file)) {
      const reader = new FileReader();
      reader.onload = () => {
        setMediaPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setMessage(description);
    } else {
      setMediaPreview(NoImage);
      setMessage(warnDescription);
    }
  };

  const handleOnAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (FileUpload.isEmpty(e)) return;
    if (FileUpload.isMaxFileSize(e)) {
      setErrorModal({ open: true, message: 'ERROR! Max Image size is 100MB' });
      return;
    }

    setMediaPreview(undefined);

    const file = e.target.files![0];
    file.arrayBuffer().then(setMediaFileBuffer);
    setMediaFile(file);
  };

  return (
    <>
      <DescriptionTypography message={message} />
      <label htmlFor="media-upload">
        <input
          id="media-upload"
          name="media-upload"
          style={{ display: 'none' }}
          type="file"
          accept="*/*"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnAddImage(e)
          }
        />
        <Box sx={{ display: 'flex', mt: 2 }}>
          <Button variant="outlined" component="span">
            Choose Media File
          </Button>
        </Box>
      </label>
      {mediaPreview ? (
        <ImageList
          sx={{ width: 300, height: 300 }}
          variant="woven"
          cols={1}
          gap={1}
        >
          <ImageListItem>
            <img
              id="mediaPreview"
              src={mediaPreview}
              alt="mediaPreview"
              loading="lazy"
            />
          </ImageListItem>
        </ImageList>
      ) : null}
    </>
  );
};
export default MediaFileUploadUI;

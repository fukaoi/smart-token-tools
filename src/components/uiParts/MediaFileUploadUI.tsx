import { Box, Button, ImageList, ImageListItem } from '@mui/material';
import { FC } from 'react';
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

const setMediaFile = (file: File, setMediaPreview: MediaFilePreviewFunc) => {
  if (FileUpload.isImagePreviewFileType(file)) {
    const reader = new FileReader();
    reader.onload = () => {
      setMediaPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  } else {
    setMediaPreview(NoImage);
  }
};

const MediaFileUploadUI: FC<MediaFileUploadUIProps> = ({
  mediaPreview,
  setMediaFilePreview: setMediaPreview,
  setMediaFileBuffer,
  setErrorModal,
}) => {
  const handleOnAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(typeof e);
    if (FileUpload.isEmpty(e)) return;
    if (FileUpload.isMaxFileSize(e)) {
      setErrorModal({ open: true, message: 'ERROR! Max Image size is 100MB' });
      return;
    }

    setMediaPreview(undefined);

    const file = e.target.files![0];
    file.arrayBuffer().then(setMediaFileBuffer);
    setMediaFile(file, setMediaPreview);
  };

  const description = 'All file types can be uploaded';

  return (
    <>
      <DescriptionTypography message={description} />
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

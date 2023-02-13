import { Box, Button, ImageList, ImageListItem } from '@mui/material';
import { FC } from 'react';
import DescriptionTypography from '../typography/DescriptionTypography';

export type MediaFileUploadUIProps = {
  mediaPreview: any;
  setErrorModal: any;
  setMediaPreview: (file: File | string | undefined) => void;
  setMediaFileBuffer: (buffer: ArrayBuffer) => void;
};

const MediaFileUploadUI: FC<MediaFileUploadUIProps> = ({
  mediaPreview,
  setMediaPreview,
  setMediaFileBuffer,
  setErrorModal,
}) => {
  const handleOnAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMediaPreview(undefined);

    if (!e.target.files) return;

    const reader = new FileReader();
    const file = e.target.files[0];
    alert(file.type);
    file.arrayBuffer().then(setMediaFileBuffer);

    // 100MB file size
    if (100000000 < file.size) {
      setErrorModal({
        open: true,
        message: 'ERROR! Max Media file size is 100MB',
      });
      return;
    }

    reader.onload = () => {
      const result = reader.result as unknown as string;
      setMediaPreview(result);
    };
    reader.readAsDataURL(file);
  };
  console.log(mediaPreview);

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

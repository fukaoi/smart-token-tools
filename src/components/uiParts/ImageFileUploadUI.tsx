import { Box, Button, ImageList, ImageListItem } from '@mui/material';
import { FC } from 'react';
import { FileUpload } from '../../shared/fileUpload';
import DescriptionTypography from '../typography/DescriptionTypography';
import ExampleTypography from '../typography/ExampleTypography';

export type ImageFileUploadUIProps = {
  imagePreview: any;
  setErrorModal: any;
  setImagePreview: (file: File | string | undefined) => void;
  setFileBuffer: (buffer: ArrayBuffer) => void;
};

const ImageFileUploadUI: FC<ImageFileUploadUIProps> = ({
  imagePreview,
  setImagePreview,
  setFileBuffer,
  setErrorModal,
}) => {
  const handleOnAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (FileUpload.isEmpty(e) || !FileUpload.isImagePreviewFileType(e)) return;
    if (FileUpload.isMaxFileSize(e)) {
      setErrorModal({ open: true, message: 'ERROR! Max Image size is 100MB' });
      return;
    }

    setImagePreview(undefined);

    const reader = new FileReader();
    const file = e.target.files![0];
    file.arrayBuffer().then(setFileBuffer);

    reader.onload = () => {
      const result = reader.result as unknown as string;
      console.log(result);
      setImagePreview(result);
    };
    reader.readAsDataURL(file);
  };

  const description = 'The following file types can be uploaded';
  const example = `
        png,  jpg,  gif,  svg,  bmp,  webp 
    `;

  return (
    <>
      <DescriptionTypography message={description} />
      <ExampleTypography example={example} />
      <label htmlFor="image-upload">
        <input
          id="image-upload"
          name="image-upload"
          style={{ display: 'none' }}
          type="file"
          accept="image/*"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnAddImage(e)
          }
        />
        <Box sx={{ display: 'flex', mt: 2 }}>
          <Button variant="outlined" component="span">
            Choose Image File
          </Button>
        </Box>
      </label>
      {imagePreview ? (
        <ImageList
          sx={{ width: 300, height: 300 }}
          variant="woven"
          cols={1}
          gap={1}
        >
          <ImageListItem>
            <img
              id="preview"
              src={imagePreview}
              alt="ImagePreview"
              loading="lazy"
            />
          </ImageListItem>
        </ImageList>
      ) : null}
    </>
  );
};
export default ImageFileUploadUI;

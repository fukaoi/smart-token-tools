import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  CardContent,
  CardMedia,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import DescriptionTypography from '../typography/DescriptionTypography';
import NoImage from '../../assets/no-image-available.jpg';
import { FileUpload } from '../../shared/fileUpload';
import { Alert } from '@mui/material';
import Card from '@mui/material/Card';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const styles = {
  card: {
    marginTop: '1em',
  },
  image: {
    width: '200px',
    height: '200px',
    marginTop: '1em',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

export type MediaFileUploadUIProps = {
  mediaFilesPreview: any;
  setMediaFilesPreview: MediaFilePreviewFunc;
  setMediaFilesBuffer: (buffer: ArrayBuffer[]) => void;
};

type MediaFilePreviewFunc = (file: File[] | string[] | undefined) => void;

const MediaFileUploadUI: FC<MediaFileUploadUIProps> = ({
  mediaFilesPreview,
  setMediaFilesPreview,
  setMediaFilesBuffer,
}) => {
  const description = 'All file types can be uploaded';
  const warnDescription =
    'This file type cant display image preview, but can upload blockchain storage';
  const [message, setMessage] = useState(description);
  const [filesName, setFilesName] = useState<string[]>([]);

  const handleOnAddMediaFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    // file.arrayBuffer().then(setMediaFilesBuffer);
    const tempFilesPreview: string[] = mediaFilesPreview
      ? mediaFilesPreview
      : [];
    const tempFilesName: string[] = filesName ? filesName : [];
    if (FileUpload.isImagePreviewFileType(file)) {
      const reader = new FileReader();
      reader.onload = () => {
        tempFilesPreview.push(reader.result as string);
      };
      reader.readAsDataURL(file);
      setMessage(description);
    } else {
      tempFilesPreview.push(NoImage);
      setMessage(warnDescription);
    }
    tempFilesName.push(file.name);
    setFilesName(tempFilesName);
    setMediaFilesPreview(tempFilesPreview);
    alert(file.name);
  };

  console.log('#mediaFilesPreview', mediaFilesPreview);
  console.log('#filesname', filesName);

  return (
    <>
      <DescriptionTypography message={message} />
      {mediaFilesPreview &&
        mediaFilesPreview.map((element: string, i: number) => {
          return (
            <Card style={styles.card} key={i}>
              <CardMedia>
                <ImageList sx={styles.image} variant="woven" cols={1} gap={1}>
                  <ImageListItem>
                    <img
                      id="mediaFilePreview"
                      src={element}
                      alt="mediaFilePreview"
                      loading="lazy"
                    />
                  </ImageListItem>
                </ImageList>
                <CardContent>
                  <Alert
                    iconMapping={{
                      success: <CheckCircleOutlineIcon fontSize="inherit" />,
                    }}
                  >
                    {filesName[i]}
                  </Alert>
                </CardContent>
              </CardMedia>
            </Card>
          );
        })}
      <label htmlFor="media-upload">
        <input
          id="media-upload"
          name="media-upload"
          style={{ display: 'none' }}
          type="file"
          accept="*/*"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnAddMediaFile(e)
          }
        />

        <Box sx={{ display: 'flex', mt: 3 }}>
          <Button variant="outlined" component="span">
            Add Media File
          </Button>
        </Box>
      </label>
    </>
  );
};
export default MediaFileUploadUI;

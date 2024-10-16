import {
  Box,
  Button,
  CardContent,
  CardMedia,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { type FC, useContext, useState } from "react";
import UsageTypography from "~/components/typography/UsageTypography";
import NoImage from "~/assets/no-image-available.jpg";
import { Validation } from "~/utils/validation";
import { Alert } from "@mui/material";
import Card from "@mui/material/Card";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { MediaFilesContext } from "~/types";

const styles = {
  card: {
    marginTop: "1em",
  },
  image: {
    width: "200px",
    height: "200px",
    marginTop: "1em",
    marginLeft: "auto",
    marginRight: "auto",
  },
  closedButton: {
    marginTop: "10px",
  },
};

export type MediaFileUploadUIProps = {
  mediaFilesPreview: any;
  setMediaFilesPreview: MediaFilePreviewFunc;
};

type MediaFilePreviewFunc = (file: File[] | string[] | undefined) => void;

const MediaFileUploadUI: FC<MediaFileUploadUIProps> = ({
  mediaFilesPreview,
  setMediaFilesPreview,
}) => {
  const description = "All file types can be uploaded";
  const warnDescription =
    "This file type cant display image preview, but can upload blockchain storage";
  const [message, setMessage] = useState(description);
  const { mediaFiles, setMediaFiles } = useContext(MediaFilesContext);

  const handleOnAddMediaFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (Validation.isImagePreviewFileType(file)) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setMediaFilesPreview([...mediaFilesPreview, result]);
      };
      reader.readAsDataURL(file);
      setMessage(description);
    } else {
      setMediaFilesPreview([...mediaFilesPreview, NoImage]);
      setMessage(warnDescription);
    }
    file.arrayBuffer().then((buffer) => {
      setMediaFiles([
        ...mediaFiles,
        {
          fileName: file.name,
          fileType: file.type,
          buffer,
        },
      ]);
    });
  };

  const deleteMediaFile = (index: number) => {
    mediaFiles.splice(index, 1);
    mediaFilesPreview.splice(index, 1);
    setMediaFiles([...mediaFiles]);
    setMediaFilesPreview([...mediaFilesPreview]);
  };

  return (
    <>
      <UsageTypography message={message} />
      {mediaFilesPreview.map((element: string, i: number) => {
        return (
          <Card style={styles.card} key={element}>
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
                  onClose={(_) => {
                    deleteMediaFile(i);
                  }}
                  iconMapping={{
                    success: <CheckCircleOutlineIcon fontSize="inherit" />,
                  }}
                >
                  {mediaFiles[i]?.fileName}
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
          style={{ display: "none" }}
          type="file"
          accept="*/*"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnAddMediaFile(e)
          }
        />
        <Box sx={{ display: "flex", mt: 3 }}>
          <Button variant="outlined" component="span">
            Add Media File
          </Button>
        </Box>
      </label>
    </>
  );
};
export default MediaFileUploadUI;

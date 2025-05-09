import {
  Box,
  Button,
  CardContent,
  CardMedia,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { type FC, useState } from "react";
import { Validation } from "~/utils/validation";
import UsageTypography from "~/components/typography/UsageTypography";
import ExampleTypography from "~/components/typography/ExampleTypography";
import Card from "@mui/material/Card";
import { Alert } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { createGenericFile, type GenericFile } from "@metaplex-foundation/umi";

const styles = {
  card: {
    marginTop: "1em",
  },
  image: {
    width: "400px",
    height: "400px",
    marginTop: "15px",
    marginLeft: "auto",
    marginRight: "auto",
  },
};

export type ImageFileUploadUIProps = {
  imagePreview: any;
  setErrorModal: any;
  setImagePreview: (file: File | string | undefined) => void;
  setGenericFileBuffer: (files: GenericFile) => void;
};

const ImageFileUploadUI: FC<ImageFileUploadUIProps> = ({
  imagePreview,
  setImagePreview,
  setGenericFileBuffer,
  setErrorModal,
}) => {
  const handleOnAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (Validation.isEmpty(e) || !Validation.isImagePreviewFileType(e)) return;
    if (Validation.isMaxFileSize(e)) {
      setErrorModal({ open: true, message: "ERROR! Max Image size is 100MB" });
      return;
    }

    setImagePreview(undefined);

    const reader = new FileReader();
    const file = e.target.files?.[0];
    if (!file) {
      throw new Error("Not found file object");
    }
    file.arrayBuffer().then((buffer) => {
      const genericFile = createGenericFile(new Uint8Array(buffer), file.name);
      setGenericFileBuffer(genericFile);
    });

    reader.onload = () => {
      setImagePreview(reader.result as string);
      setFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const [fileName, setFileName] = useState("");

  const description = `
        The image file upload component allows users to upload image files.
    `;
  const example = `
        png,  jpg,  gif,  svg,  bmp,  webp
    `;

  return (
    <>
      <UsageTypography message={description} />
      <ExampleTypography example={example} />
      <label htmlFor="image-upload">
        <input
          id="image-upload"
          name="image-upload"
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnAddImage(e)
          }
        />
        <Box sx={{ display: "flex", mt: 2 }}>
          <Button variant="outlined" component="span">
            Choose Image File
          </Button>
        </Box>
      </label>
      {imagePreview ? (
        <Card style={styles.card}>
          <CardMedia>
            <ImageList sx={styles.image} variant="woven" cols={1} gap={1}>
              <ImageListItem>
                <img
                  id="preview"
                  src={imagePreview}
                  alt="ImagePreview"
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
                {fileName}
              </Alert>
            </CardContent>
          </CardMedia>
        </Card>
      ) : null}
    </>
  );
};
export default ImageFileUploadUI;

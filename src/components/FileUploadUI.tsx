import { Button, ImageList, ImageListItem } from "@mui/material";
import { FC, useState } from "react";

const FileUploadUI: FC = () => {
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );

  const handleOnAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImagePreview(undefined);

    if (!e.target.files) return;
    if (!e.target.files?.[0].type.match("image.*")) return;

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = (e: any) => {
      const result = e.target.result as string;
      setImagePreview(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mg20">
      <label htmlFor="btn-upload">
        <input
          id="btn-upload"
          name="btn-upload"
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnAddImage(e)
          }
        />
        <Button variant="outlined" component="span">
          Choose Image
        </Button>
      </label>
      {imagePreview ? (
        <ImageList
          sx={{ width: 500, height: 450 }}
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
    </div>
  );
};
export default FileUploadUI;

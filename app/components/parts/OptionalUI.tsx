import { Box } from "@mui/material";
import { FC, useState } from "react";
import { Control, useFieldArray } from "react-hook-form";
import RoyaltyTextField from "~/components/textField/RoyaltyTextField";
import CreatorUI from "./CreatorUI";
import AddCreatorButton from "../button/AddCreatorButton";
import { NFTMetadata } from "~/types";
import HeadlineTypography from "~/components/typography/HeadlineTypography";
import MediaFileUploadUI from "~/components/parts/MediaFileUploadUI";
import { validationRules } from "~/utils/validation";
import BackgroundBlur from "../animation/BackgroundBlur";
import ErrorModal from "../modal/ErrorModal";

export type OptionalUIProps = {
  isShow: boolean;
  control?: Control<NFTMetadata>;
};

const OptionalUI: FC<OptionalUIProps> = ({ isShow, control }) => {
  const { fields, append, remove } = useFieldArray({
    name: `creators`,
    control,
  });
  const [mediaFilesPreview, setMediaFilesPreview] = useState<
    File[] | string[] | undefined
  >([]);
  const [errorModal, setErrorModal] = useState({ open: false, message: "" });
  const handleAddButton = () => {
    append({
      address: "",
      share: 0,
    });
  };
  const handleClose = () => {
    setErrorModal({ open: false, message: "" });
  };

  return isShow
    ? (
      <>
        <BackgroundBlur>
          <Box sx={{ mb: 4 }} />
          <RoyaltyTextField
            control={control}
            name="royalty"
            rules={validationRules.royalty}
          />
          <Box sx={{ mb: 4 }} />
          <HeadlineTypography message="Optional media Upload" />
          <Box sx={{ mb: 4 }} />
          <MediaFileUploadUI
            {...{
              mediaFilesPreview,
              setMediaFilesPreview,
            }}
          />
          <CreatorUI {...{ control, fields, remove }} />
          <Box sx={{ mb: 4 }} />
          <AddCreatorButton callbackFunc={handleAddButton} />
          <Box sx={{ mb: 4 }} />
        </BackgroundBlur>
        <ErrorModal
          open={errorModal.open}
          onClose={handleClose}
          message={errorModal.message}
        />
      </>
    )
    : null;
};

export default OptionalUI;

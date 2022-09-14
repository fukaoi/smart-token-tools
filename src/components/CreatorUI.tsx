import { Box } from "@mui/material";
import { FC } from "react";
import { ControllerRenderProps } from "react-hook-form";
import WalletAddressTextField from "./textField/WalletAddressTextField";
import VerifiedRadio from "./radio/VerifiedRadio";
import ShareTextField from "./textField/ShareTextField";
import HeadlineTypography from "./typography/HeadlineTypography";

export type CreatorUIProps = {
  field?: ControllerRenderProps;
  register?: any;
  control?: any;
};

const CreatorUI: FC<CreatorUIProps> = ({ control }) => {
  return (
    <>
      <Box sx={{ mb: 4 }} />
      <HeadlineTypography message="Creator Info Input Form" />
      <WalletAddressTextField control={control} name="address" />
      <Box sx={{ mb: 4 }} />
      <ShareTextField control={control} name="share" />
      <Box sx={{ mb: 4 }} />
      <HeadlineTypography message="Verified" />
      <VerifiedRadio control={control} name="verified" />
    </>
  );
};
export default CreatorUI;

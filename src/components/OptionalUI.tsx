import { Box, Button, ImageList, ImageListItem } from "@mui/material";
import { FC, useState } from "react";
import HeadlineTypography from "../components/typography/HeadlineTypography";

const OptionalUI: FC<{ isShow: boolean }> = (isShow) => {
  return (
    <>
      <Box sx={{ mb: 4 }} />
      <HeadlineTypography message="Royalty" />
    </>
  );
};
export default OptionalUI;

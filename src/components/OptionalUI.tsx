import { Box, Button, ImageList, ImageListItem } from "@mui/material";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { FormValues, Creator } from "../pages/NftPage";

import RoyaltyTextField from "./textField/RoyaltyTextField";
import WalletAddressTextField from "./textField/WalletAddressTextField";
import VerifiedRadio from "./radio/VerifiedRadio";
import ShareTextField from "./textField/ShareTextField";
import CollectionTextField from "./textField/CollectionTextField";

const OptionalUI: FC<{ isShow: boolean }> = (isShow) => {
  const { handleSubmit, control, watch } = useForm<FormValues>({
    defaultValues: {
      royalty: 0,
      address: "",
      verified: false,
      share: 0,
      collection: "ATONOY",
    },
  });

  return (
    <>
      <Box sx={{ mb: 4 }} />
      <RoyaltyTextField control={control} name="royalty" />
      <Box sx={{ mb: 4 }} />
      <WalletAddressTextField control={control} name="address" />
      <Box sx={{ mb: 4 }} />
      <VerifiedRadio control={control} name="verified" />
      <Box sx={{ mb: 4 }} />
      <ShareTextField control={control} name="share" />
      <Box sx={{ mb: 4 }} />
      <CollectionTextField control={control} name="collection" />
    </>
  );
};
export default OptionalUI;

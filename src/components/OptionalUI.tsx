import { Box, Button, ImageList, ImageListItem } from "@mui/material";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { FormValues } from "../pages/NftPage";
import RoyaltyTextField from "./textField/RoyaltyTextField";
import WalletAddressTextField from "./textField/WalletAddressTextField";
import VerifiedRadio from "./radio/VerifiedRadio";
import ShareTextField from "./textField/ShareTextField";
import CollectionTextField from "./textField/CollectionTextField";

export type OptionalUIProps = {
  isShow: boolean;
  royalty: number;
  setRoyalty: (royalty: number) => void;
  walletAddress: string;
  setWalletAddress: (walletAddress: string) => void;
  verified: boolean;
  setVerified: (verified: boolean) => void;
  share: number;
  setShare: (share: number) => void;
  collection: string;
  setCollection: (collection: string) => void;
};

const OptionalUI: FC<OptionalUIProps> = () => {
  const { control } = useForm<FormValues>({
    defaultValues: {
      royalty: 0,
      address: "",
      verified: false,
      share: 0,
      collection: "Powered by ATONOY Co, Ltd",
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

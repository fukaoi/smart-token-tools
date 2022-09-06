import { Box } from "@mui/material";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { FormValues } from "../pages/NftPage";
import WalletAddressTextField from "./textField/WalletAddressTextField";
import VerifiedRadio from "./radio/VerifiedRadio";
import ShareTextField from "./textField/ShareTextField";
import HeadlineTypography from "./typography/HeadlineTypography";

export type CreatorUIProps = {
  walletAddress: string;
  setWalletAddress: (walletAddress: string) => void;
  share: number;
  setShare: (share: number) => void;
  verified: boolean;
  setVerified: (verified: boolean) => void;
};

const CreatorUI: FC<CreatorUIProps> = () => {
  const { control } = useForm<FormValues>({
    defaultValues: {
      address: "",
      verified: false,
      share: 0,
    },
  });

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

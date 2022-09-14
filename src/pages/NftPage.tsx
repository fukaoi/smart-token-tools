import { useState } from "react";
import { Paper, Box, FormControl } from "@mui/material";
import { ControllerRenderProps, useForm } from "react-hook-form";
import TitleTypography from "../components/typography/TitleTypography";
import AddressTypography from "../components/typography/AddressTypography";
import ClusterRadio from "../components/radio/ClusterRadio";
import SubmitButton from "../components/button/SubmitButton";
import { useSessionCheck } from "../hooks/SessionCheck";
import ErrorModal from "../components/modal/ErrorModal";
import NftNameTextField from "../components/textField/NftNameTextField";
import SymbolTextField from "../components/textField/SymbolTextField";
import OptionalButton from "../components/button/OptionalButton";
import DescriptionTextField from "../components/textField/DescriptionTextField";
import HeadlineTypography from "../components/typography/HeadlineTypography";
import FileUploadUI from "../components/FileUploadUI";
import OptionalUI from "../components/OptionalUI";
import Loading from "../components/Loading";
import { nftMint } from "../shared/nftMint";
import { Validator } from "@solana-suite/nft";

export interface NFTFormValues {
  cluster: string;
  nftName: string;
  symbol: string;
  description: string;
  imagePreview?: string;
  royalty?: number;
  address?: string;
  verified?: boolean;
  share?: number;
  collection?: string;
  control?: any;
  field?: ControllerRenderProps;
  optional: any;
}

export interface Creator {
  address: string;
  verified: boolean;
  share: number;
}

const styles = {
  root: {
    marginTop: "1em",
    minWidth: "20em",
    maxWidth: "20em",
    padding: "1.2em",
  },
};

const NftPage = () => {
  useSessionCheck(console.log);

  const [btnState, setBtnState] = useState({
    title: "Confirm",
    isDisabled: false,
  });
  const [imagePreview, setImagePreview] = useState<File | string | undefined>(
    undefined
  );
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [optionalBtnState, setOptionalBtnState] = useState(false);
  const [errorModal, setErrorModal] = useState({ open: false, message: "" });
  const [isShow, setIsShow] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { handleSubmit, control, register } = useForm<NFTFormValues>({
    defaultValues: {
      cluster: "devnet",
      royalty: 0,
      share: 0,
      verified: false,
      collection: "Powered by ATONOY Co, Ltd",
    },
  });

  const handleClose = () => {
    setErrorModal({ open: false, message: "" });
    setBtnState({ title: "Confirm", isDisabled: false });
  };

  const onSubmit = async (data: any) => {
    // setBtnState({ title: "Processing", isDisabled: true });
    setIsLoading(true);
    alert("on submit");
    console.log(data);
    setIsLoading(false);

    // const a = Validator.isSymbol(data.symbol);
    // console.log("a", a);

    await nftMint(
      imagePreview as string,
      data.nftName,
      data.description,
      0,
      window.solana
    );
  };

  const handleOptionalButton = () => {
    setOptionalBtnState((prevState) => !prevState);
    setIsShow((prevState) => !prevState);
  };

  useSessionCheck(setWalletAddress);

  return (
    <>
      <TitleTypography title="NFT" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Paper sx={styles.root}>
            <AddressTypography address={walletAddress} />
            <ClusterRadio control={control} name="cluster" />
            <Box sx={{ mb: 4 }} />
            <NftNameTextField control={control} name="nftName" />
            <Box sx={{ mb: 4 }} />
            <SymbolTextField control={control} name="symbol" />
            <Box sx={{ mb: 4 }} />
            <DescriptionTextField control={control} name="description" />
            <Box sx={{ mb: 4 }} />
            <HeadlineTypography message="Image Upload" />
            <Box sx={{ mb: 4 }}>
              <FileUploadUI {...{ imagePreview, setImagePreview }} />
            </Box>
            <Box sx={{ mb: 4 }}>
              <OptionalButton
                isOpen={optionalBtnState}
                callbackFunc={handleOptionalButton}
              />
            </Box>
            {isShow ? (
              <OptionalUI
                {...{
                  isShow,
                  control,
                  register,
                }}
              />
            ) : null}
          </Paper>
          <Box sx={{ mb: 6 }} />
          <Box>
            <SubmitButton
              isDisabled={btnState.isDisabled}
              title={btnState.title}
            />
          </Box>
          <Box sx={{ mb: 10 }} />
        </FormControl>
      </form>
      <ErrorModal
        open={errorModal.open}
        onClose={handleClose}
        message={errorModal.message}
      />
      <Loading isLoading={isLoading} />
    </>
  );
};
export default NftPage;

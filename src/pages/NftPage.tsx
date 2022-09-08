import { useState } from "react";
import { Paper, Box, FormControl } from "@mui/material";
import { useForm } from "react-hook-form";
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

export interface FormValues {
  cluster: string;
  issueType: string;
  totalSupply: number;
  decimals: number;
  tokenKey?: string;
  nftName?: string;
  symbol?: string;
  description?: string;
  imagePreview?: string;
  royalty?: number;
  address?: string;
  verified?: boolean;
  share?: number;
  collection?: string;
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
  const [royalty, setRoyalty] = useState<number>(0);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false);
  const [share, setShare] = useState<number>(0);
  const [collection, setCollection] = useState<string>(
    "Powered by ATONOY Co, Ltd"
  );
  const [optionalBtnState, setOptionalBtnState] = useState(false);
  const [errorModal, setErrorModal] = useState({ open: false, message: "" });
  const [isShow, setIsShow] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      cluster: "devnet",
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

    const res = await nftMint(
      imagePreview as string,
      data.nftName,
      data.description,
      0,
      walletAddress,
      "ZMJzAhx7YhuvvPEknhUeBKHJeimEXPo2xTsCwRXzoCq2P1y79qwFzgmukBTNAyRdsVHTTznchFbDT2gnQBnm7aW"
    );
    console.log(res);
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
                  royalty,
                  setRoyalty,
                  walletAddress,
                  setWalletAddress,
                  verified,
                  setVerified,
                  share,
                  setShare,
                  collection,
                  setCollection,
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

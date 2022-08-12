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
import UploadButton from "../components/button/UploadButton";
import SymbolTextField from "../components/textField/SymbolTextField";

export interface FormValues {
  cluster: string;
  issueType: string;
  totalSupply: number;
  decimals: number;
  tokenKey?: string;
  nftName?: string;
  symbol?: string;
  sellerFeeBasisPoints?: number;
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
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [btnState, setBtnState] = useState({
    title: "Confirm",
    isDisabled: false,
  });
  const [uploadBtnState, setUploadBtnState] = useState({
    title: "Upload",
    isDisabled: false,
  });

  const [errorModal, setErrorModal] = useState({ open: false, message: "" });
  const { handleSubmit, control, watch } = useForm<FormValues>({
    defaultValues: {
      cluster: "devnet",
    },
  });

  const handleClose = () => {
    setErrorModal({ open: false, message: "" });
    setBtnState({ title: "Confirm", isDisabled: false });
  };

  const onSubmit = async (data: FormValues) => {
    setBtnState({ title: "Processing", isDisabled: true });
    alert("on submit");
    console.log(data);
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
            <Box>
              <UploadButton
                isDisabled={uploadBtnState.isDisabled}
                title={uploadBtnState.title}
              />
            </Box>
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
    </>
  );
};
export default NftPage;

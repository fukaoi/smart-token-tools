import TitleTypography from "../components/typography/TitleTypography";
import DescriptionTypography from "../components/typography/DescriptionTypography";
import AddressTypography from "../components/typography/AddressTypography";
import { Box, Paper } from "@mui/material";
import SubmitButton from "../components/button/SubmitButton";
import InfoModal from "../components/modal/InfoModal";
import { useState } from "react";
import ErrorModal from "../components/modal/ErrorModal";

export type FormValues = {
  cluster: string;
  issueType: string;
  totalSupply: number;
  decimals: number;
  tokenKey?: string;
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  root: {
    marginTop: "1em",
    minWidth: "20em",
    maxWidth: "20em",
    padding: "1.2em",
  },
};

const Faucet = () => {
  const [open, setOpen] = useState(false);
  const [errorModal, setErrorModal] = useState({ open: false, message: "" });
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [btnState, setBtnState] = useState({
    title: "Confirm",
    isDisabled: false,
  });

  const onSubmit = async (walletAddress: string) => {
    setBtnState({ title: "Processing", isDisabled: true });
    const res = false;
    if (res) {
      setErrorModal({ open: true, message: "error" });
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setBtnState({ title: "Confirm", isDisabled: false });
  };
  const description =
    `By pressing the submit button, you can receive 1SOL. This feature is only supported by devnet, so if you are on mainnet, you can buy SOLs on the exchange or have them sent to you from another address.`;
  return (
    <>
      <TitleTypography title="FAUCET" />
      <Box sx={styles.container}>
        <Paper sx={styles.root}>
          <AddressTypography address={walletAddress} />
          <DescriptionTypography message={description} />
        </Paper>
      </Box>
      <Box sx={{ mb: 6 }} />
      <Box>
        <SubmitButton
          title={btnState.title}
          isDisabled={btnState.isDisabled}
          onClick={onSubmit}
        />
        <InfoModal open={open} onClose={handleClose} />
      </Box>
      <Box sx={{ mb: 10 }} />
      <ErrorModal
        open={errorModal.open}
        onClose={handleClose}
        message={errorModal.message}
      />
    </>
  );
};
export default Faucet;

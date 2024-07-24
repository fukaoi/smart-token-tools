import TitleTypography from "../components/typography/TitleTypography";
import DescriptionTypography from "../components/typography/DescriptionTypography";
import AddressTypography from "../components/typography/AddressTypography";
import { Box, Paper } from "@mui/material";
import SubmitButton from "../components/button/SubmitButton";
import InfoModal from "../components/modal/InfoModal";
import { useEffect, useState } from "react";
import ErrorModal from "../components/modal/ErrorModal";
import { useWallet } from "@solana/wallet-adapter-react";
import { useNavigate } from "@remix-run/react";

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
  const navigate = useNavigate();
  const [errorModal, setErrorModal] = useState({ open: false, message: "" });
  const [btnState, setBtnState] = useState({
    title: "SUBMIT",
    isDisabled: false,
  });

  const [address, setAddress] = useState("");

  const { publicKey } = useWallet();

  useEffect(() => {
    if (publicKey) {
      setAddress(publicKey.toString());
    } else {
      setErrorModal({ open: true, message: "Can't connect your wallet" });
      navigate("/");
    }
  }, [publicKey]);

  const onSubmit = async () => {
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
          <AddressTypography address={address} />
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

"use client";

import WarningModal from "../components/modal/WarningModal";
import WalletConnectButton from "../components/button/WalletConnectButton";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import SolanaCircleLogo from "../assets/solana-logo-card.svg";
import { Box } from "@mui/material";

const Index = () => {
  const [warningModal, setWarningModal] = useState({
    open: false,
    message: "",
  });
  const title = "Connect Wallet";
  const [btnState, setBtnState] = useState({
    title: title,
    isDisabled: true,
  });
  const [isChecked, setIsChecked] = useState(false);

  // useEffect(() => {
  //   if (state?.warning !== undefined) {
  //     setWarningModal({ open: true, message: state.warning });
  //   }
  // }, [state]);

  const handleClose = () => {
    setWarningModal({ open: false, message: "" });
    setBtnState({ title, isDisabled: true });
  };

  const connectHandler = () => {
    const title = "Processing";
    setBtnState({ title, isDisabled: true });
    if (!window.solana) {
      const message = `You will need Solana Wallet to access.
        please install Solana Wallet`;
      setWarningModal({ open: true, message });
    } else {
      window.solana.connect().then(() => {
        // navigate('/nft');
      });
    }
  };

  return (
    <>
      <Box sx={{ position: "relative" as const, top: "2em" }}>
        <Typography component="div" fontSize="23px" fontWeight="500">
          LETS TOKEN / NFT ISSUE EASY AND QUICKLY
        </Typography>
        <Typography component="div" fontSize="2.4em" fontWeight="bold">
          TOKEN AND NFT TOOLS
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap" as const,
        }}
      >
        <Card
          sx={{
            position: "relative",
            top: "4em",
            maxWidth: 500,
            marginTop: "2em",
            maxHeight: "500px",
            marginLeft: "4em",
            marginRight: "4em",
          }}
        >
          <CardMedia
            sx={{ textAlign: "center", height: 121 }}
            component="img"
            image={SolanaCircleLogo}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Need. Install Solana Wallet
            </Typography>
            <Typography fontSize={20} color="text.secondary">
              SMT only allows connections to solana wallet, you must first
              install the solana wallet extension or wallet app for smartphone.
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "7em",
        }}
      >
        <Box
          sx={{
            width: 500,
          }}
        >
          <Box
            sx={{ width: "100%", marginTop: "1.5em", marginBottom: "1em" }}
          >
            <WalletConnectButton />
          </Box>
        </Box>
      </Box>
      <WarningModal
        open={warningModal.open}
        onClose={handleClose}
        message={warningModal.message}
      />
    </>
  );
};

export default Index;

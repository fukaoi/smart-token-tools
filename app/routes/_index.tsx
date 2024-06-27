"use client";

import WarningModal from "../components/modal/WarningModal";
import SubmitButton from "../components/button/SubmitButton";
import WalletConnectButton from "../components/button/WalletConnectButton";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import SolanaCircleLogo from "../assets/solana-logo-card.svg";
import Button from "@mui/material/Button";
import { Box, Link } from "@mui/material";
import { Device } from "../utils/device";
import UserPolicyCheckBox from "../components/checkbox/userPolicyCheckbox";
import { height } from "@mui/system";
import { Wallet } from "@mui/icons-material";

const styles = {
  message: {
    position: "relative" as const,
    top: "2em",
  },
  submit: {
    width: "100%",
    marginTop: "1.5em",
    marginBottom: "1em",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap" as const,
  },
  cardMedia: {
    textAlign: "center",
    height: 121,
  },
  cardContainer: {
    position: "relative",
    top: "4em",
    maxWidth: 500,
    marginTop: "2em",
    maxHeight: "500px",
    marginLeft: "4em",
    marginRight: "4em",
  },
  cardAction: {
    justifyContent: "center",
  },
  link: {
    textDecoration: "none",
  },
  policyBox: {
    display: "flex",
    justifyContent: "center",
    marginTop: "6.5em",
  },
  policyCard: {
    width: 400,
  },
};

function WellComeMessage() {
  return (
    <Box style={styles.message}>
      <Typography component="div" fontSize="23px" fontWeight="500">
        LETS TOKEN / NFT ISSUE EASY AND QUICKLY
      </Typography>
      <Typography component="div" fontSize="2.4em" fontWeight="bold">
        TOKEN AND NFT TOOLS
      </Typography>
    </Box>
  );
}

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

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    setBtnState((prevState) => ({ title, isDisabled: !prevState.isDisabled }));
  };

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
      <WellComeMessage />
      <Box style={styles.container}>
        <Card sx={styles.cardContainer}>
          <CardMedia
            sx={styles.cardMedia}
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
      <Box style={styles.policyBox}>
        <Box sx={styles.policyCard}>
          <UserPolicyCheckBox
            callbackFunc={toggleCheckbox}
            isChecked={isChecked}
          />
          <Box style={styles.submit}>
            {
              /*

 <SubmitButton
              isDisabled={btnState.isDisabled}
              title={btnState.title}
              callbackFunc={connectHandler}
            />

            */
            }
            <WalletConnectButton
              isDisabled={btnState.isDisabled}
              title={btnState.title}
              callbackFunc={connectHandler}
            />
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

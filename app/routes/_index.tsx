"use client";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import SolanaCircleLogo from "../assets/solana-logo-card.svg";
import { Box } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import SubmitButton from "~/components/button/SubmitButton";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { redirect, useNavigate } from "@remix-run/react";

const Index = () => {
  const title = "Connect Wallet";
  const navigate = useNavigate();
  const [btnState, setBtnState] = useState({
    title: title,
    isDisabled: true,
  });
  const { publicKey } = useWallet();

  useEffect(() => {
    console.log("# publicKey: ", publicKey?.toString());
    if (publicKey !== undefined) {
      navigate("/nft");
    }
  }, [publicKey]);

  const handleClose = () => {
    setBtnState({ title, isDisabled: true });
  };

  const connectHandler = () => {
    const title = "Processing";
    setBtnState({ title, isDisabled: true });
    if (!window.solana) {
      const message = `You will need Solana Wallet to access.
        please install Solana Wallet`;
      alert;
      message;
    } else {
      window.solana.connect().then(() => {
        alert(1);
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
          height: "100%",
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
            <WalletMultiButton onClick={connectHandler} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Index;

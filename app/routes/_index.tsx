import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import SolanaCircleLogo from "~/assets/solana-logo-card.svg";
import { Box } from "@mui/material";
import { useWallet, Wallet } from "@solana/wallet-adapter-react";
import { useNavigate } from "@remix-run/react";
import { lazy, useEffect, useState } from "react";
const WalletConnectButton = lazy(() =>
  import("~/components/button/WalletConnectButton")
);

const Index = () => {
  const navigate = useNavigate();
  const { publicKey, select } = useWallet();
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (publicKey && clicked) {
      navigate("/nft");
    }
  }, [clicked, publicKey]);

  const connectHandler = (wallet: Wallet) => {
    console.log(wallet);
    select(wallet.adapter.name);
    setClicked(true);
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
            maxWidth: 400,
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
          marginTop: "6em",
        }}
      >
        <Box
          sx={{
            width: "auto",
            marginBottom: "2em",
          }}
        >
          <WalletConnectButton onClick={connectHandler} />
        </Box>
      </Box>
    </>
  );
};
export default Index;

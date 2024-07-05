"use client";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import SolanaCircleLogo from "../assets/solana-logo-card.svg";
import { Box, Button, ListItem, ListItemText } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { useNavigate } from "@remix-run/react";
import { WalletName } from "@solana/wallet-adapter-base";

const Index = () => {
  const navigate = useNavigate();
  const { select, wallets, publicKey } = useWallet();

  const connectHandler = (selectedButton: WalletName) => {
    if (!publicKey) {
      select(selectedButton);
    } else {
      console.log("# publicKey: ", publicKey);
      navigate("/nft");
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
          marginTop: "7em",
        }}
      >
        <Box
          sx={{
            width: 350,
            marginTop: "0.2em",
            marginBottom: "1em",
          }}
        >
          {wallets.filter((wallet) => wallet.readyState === "Installed")
              .length >
              0
            ? (
              wallets
                .filter((wallet) => wallet.readyState === "Installed")
                .map((wallet) => (
                  <ListItem
                    key={wallet.adapter.name}
                    sx={{
                      backgroundColor: "rgba(3,3,3, 0.6)",
                      marginBottom: "12px",
                      borderRadius: "4px",
                    }}
                  >
                    <Button
                      key={wallet.adapter.name}
                      onClick={() => (wallet.adapter.name)}
                    >
                      <img
                        src={wallet.adapter.icon}
                        alt={wallet.adapter.name}
                        width={"50 %"}
                        height={"50 %"}
                        style={{ marginRight: "1em" }}
                      />
                      <ListItemText
                        primary={wallet.adapter.name}
                        sx={{
                          textDecoration: "none",
                          color: "white",
                        }}
                      />
                    </Button>
                  </ListItem>
                ))
            )
            : (
              <Typography fontSize={20}>
                No wallet found. Please download a supported Solana wallet
              </Typography>
            )}
        </Box>
      </Box>
    </>
  );
};

export default Index;

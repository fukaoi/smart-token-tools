import { Button, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useWallet, Wallet } from "@solana/wallet-adapter-react";
import Typography from "@mui/material/Typography";
import { FC } from "react";

const WalletConnectButton: FC<{ onClick: (selectedWallet: Wallet) => void }> = (
  { onClick },
) => {
  const { wallets } = useWallet();

  return (
    <>
      {wallets.filter((wallet: Wallet) => wallet.readyState === "Installed")
        .length >
        0
        ? (
          wallets
            .filter((wallet) => wallet.readyState === "Installed")
            .map((wallet) => (
              <ListItemButton
                key={wallet.adapter.name}
                onClick={() => onClick(wallet)}
                sx={{
                  width: "250px",
                  backgroundColor: "rgba(3,3,3, 0.6)",
                  marginBottom: "12px",
                  borderRadius: "4px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  "&:hover": {
                    backgroundColor: "rgba(16, 130, 105, 0.6)",
                  },
                }}
              >
                <img
                  src={wallet.adapter.icon}
                  alt={wallet.adapter.name}
                  width={"35px"}
                  height={"35px"}
                  style={{ marginRight: "1em" }}
                />
                <ListItemText
                  primary={wallet.adapter.name}
                  sx={{
                    textDecoration: "none",
                    color: "white",
                  }}
                />
              </ListItemButton>
            ))
        )
        : (
          <Typography fontSize={20}>
            No wallet found. Please download a supported Solana wallet
          </Typography>
        )}
    </>
  );
};
export default WalletConnectButton;

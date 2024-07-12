import { Button, ListItem, ListItemText } from "@mui/material";
import { useWallet, Wallet } from "@solana/wallet-adapter-react";
import Typography from "@mui/material/Typography";
import { WalletName } from "@solana/wallet-adapter-base";
import { FC } from "react";

const WalletConnectButton: FC<{ onClick: (selectedName: WalletName) => void }> =
  ({ onClick }) => {
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
                    onClick={() => onClick(wallet.adapter.name)}
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
      </>
    );
  };
export default WalletConnectButton;

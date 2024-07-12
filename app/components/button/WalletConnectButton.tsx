"use client";

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
        <ListItem
          key={"phantom"}
          sx={{
            backgroundColor: "rgba(3,3,3, 0.6)",
            marginBottom: "12px",
            borderRadius: "4px",
          }}
        >
          <Button
            key={"phantom"}
          >
            <img
              src={"phantom"}
              alt={"phantom"}
              width={"50 %"}
              height={"50 %"}
              style={{ marginRight: "1em" }}
            />
            <ListItemText
              primary={"phantom"}
              sx={{
                textDecoration: "none",
                color: "white",
              }}
            />
          </Button>
        </ListItem>
      </>
    );
  };
export default WalletConnectButton;

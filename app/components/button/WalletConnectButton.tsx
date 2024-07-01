import React, { CSSProperties, FC, useMemo } from "react";
import {
  Box,
  fontSize,
  fontStyle,
  style,
  styled,
  textAlign,
} from "@mui/system";
import Button from "@mui/material/Button";
import SubmitButton from "./SubmitButton";
import { theme } from "../../utils/colorTheme";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";

// const StyledButton = styled(Button)({
const styles: CSSProperties = {
  background: theme.palette.blueGuradation.main,
  borderRadius: 12,
  width: "280px",
  height: "60px",
  fontSize: "20px",
  fontWeight: 550,
  justifyContent: "center",
  display: "block",
  margin: "auto",
};

const WalletConnectButton: FC<{
  title: string;
  callbackFunc?: (event?: any) => void;
  isDisabled?: boolean;
}> = ({ title, callbackFunc, isDisabled = false }) => {
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      /**
       * Wallets that implement either of these standards will be available automatically.
       *
       *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
       *     (https://github.com/solana-mobile/mobile-wallet-adapter)
       *   - Solana Wallet Standard
       *     (https://github.com/anza-xyz/wallet-standard)
       *
       * If you wish to support a wallet that supports neither of those standards,
       * instantiate its legacy wallet adapter here. Common legacy adapters can be found
       * in the npm package `@solana/wallet-adapter-wallets`.
       */
      // new UnsafeBurnerWalletAdapter(),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network],
  );
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Box style={styles}>
            <WalletMultiButton style={styles} />
          </Box>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
export default WalletConnectButton;
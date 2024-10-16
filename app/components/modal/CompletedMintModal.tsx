import type { FC } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Alert } from "@mui/material";
import { useStorage } from "~/utils/storage";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

const CompletedMintModal: FC<{ open: boolean; onClose: any; mint: string }> = ({
  open,
  onClose,
  mint,
}) => {
  const [storage] = useStorage("network");
  console.info("# setted storage: ", storage.cluster);

  let explorerUrl = `https://explorer.solana.com/address/${mint}/metadata?cluster=devnet`;
  if (storage.cluster === WalletAdapterNetwork.Mainnet) {
    explorerUrl = `https://solscan.io/token/${mint}`;
  }
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 1,
          }}
        >
          <Alert sx={{ fontSize: "1.2em" }} variant="filled" severity="success">
            Mint Completed
            <br />
            <a
              href={explorerUrl}
              style={{
                color: "white",
              }}
              rel="noreferrer"
              target="_blank"
            >
              Click explorer url
            </a>
          </Alert>
        </Box>
      </Modal>
    </>
  );
};
export default CompletedMintModal;

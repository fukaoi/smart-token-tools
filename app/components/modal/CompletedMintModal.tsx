import { FC } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Alert } from "@mui/material";

const CompletedMintModal: FC<{ open: boolean; onClose: any; mint: string }> = (
  { open, onClose, mint },
) => {
  const explorerUrl = `https://solscan.io/token/${mint}?cluster=devnet`;
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
          <Alert
            sx={{ fontSize: "1.2em" }}
            variant="filled"
            severity="success"
            color="primary"
          >
            Mint Completed
            <br />
            <a
              href={explorerUrl}
              style={{
                color: "white",
              }}
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

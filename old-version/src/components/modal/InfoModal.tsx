import { FC } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Alert } from '@mui/material';

const style = {
  alert: {
    fontSize: '1.2em',
  },
  box: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 1,
  },
};

const InfoModal: FC<{ open: boolean; onClose: any }> = ({ open, onClose }) => {
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style.box}>
          <Alert
            sx={style.alert}
            variant="filled"
            severity="success"
            color="info"
          >
            Faucet a success. Got 1 SOL
          </Alert>
        </Box>
      </Modal>
    </>
  );
};
export default InfoModal;

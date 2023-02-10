import { FC } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { textDocument } from '../../assets/terms-of-use';
import TermOfUseTitileTypography from '../typography/TermsOfUseTitleTypography';

const style = {
  alert: {
    fontSize: '1.2em',
  },
  box: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '50%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflow: 'scroll',
    overflowY: 'scroll',
    wordBreak: 'break-word',
    overflowWrap: 'anywhere',
  },
};

const TermsOfUseModal: FC<{ open: boolean; onClose: any }> = ({
  open,
  onClose,
}) => {
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style.box}>
          <TermOfUseTitileTypography message="SMT (Smart Token tool) Service Terms of Use" />
          <pre>{textDocument}</pre>
        </Box>
      </Modal>
    </>
  );
};
export default TermsOfUseModal;

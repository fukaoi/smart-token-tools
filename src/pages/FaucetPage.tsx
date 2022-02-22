import {makeStyles} from '@mui/styles';
import TitleTypography from "../components/typography/TitleTypography";
import DescriptionTypography from '../components/typography/DescriptionTypography';
import AddressTypography from '../components/typography/AddressTypography';
import {Paper, Box} from '@mui/material';
import SubmitButton from '../components/button/SubmitButton';
import CompleteModal from '../components/modal/CompleteModal';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Account} from '@solana-suite/core';

export interface FormValues {
  cluster: string,
  issueType: string,
  totalSupply: number,
  decimals: number,
  tokenKey?: string,
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  root: {
    marginTop: '1em',
    minWidth: '20em',
    maxWidth: '20em',
    padding: '1.2em',
  },
});

const FaucetPage = () => {
  const navigate = useNavigate();
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [btnState, setBtnState] = useState({title: 'Confirm', isDisabled: false});

  // Fetch wallet address
  useEffect(() => {
    if (window.solana) {
      if (!window.solana.isConnected) {
        const message = 'Your session disconnected from phantom wallet';
        navigate('/', {state: {warning: message}});
      }
      window.solana.connect().then((conn: any) => {
        setWalletAddress(conn.publicKey.toString());
      });
    }
    const id = setInterval(() => {
      window.solana.connect({onlyIfTrusted: true}).then((conn: any) => {
        setWalletAddress(conn.publicKey.toString());
      });
    }, 5000);
    return () => clearInterval(id);
  });

  const onSubmit = async (walletAddress: string) => {
    setBtnState({title: 'Processing', isDisabled: true});
    const res = await Account.requestAirdrop(walletAddress.toPublicKey());
    if (res.isErr) {
      navigate('/', {state: {error: res.error}});
    } else {
      setOpen(true);
    }
  }
  const handleClose = () => {
    setOpen(false);
    setBtnState({title: 'Confirm', isDisabled: false});
  };
  const description =
    `By pressing the submit button, you can receive 1SOL. This feature is only supported by devnet, so if you are on mainnet, you can buy SOLs on the exchange or have them sent to you from another address.`;
  return (
    <>
      <TitleTypography title='FAUCET' />
      <div className={styles.container}>
        <Paper className={styles.root}>
          <AddressTypography address={walletAddress} />
          <DescriptionTypography message={description} />
        </Paper>
      </div>
      <Box sx={{mb: 6}} />
      <div>
        <SubmitButton
          title={btnState.title}
          isDisabled={btnState.isDisabled}
          callbackFunc={() => onSubmit(walletAddress)}
        />
        <CompleteModal open={open} onClose={handleClose} />
      </div>
      <Box sx={{mb: 10}} />
    </>
  );
};
export default FaucetPage;

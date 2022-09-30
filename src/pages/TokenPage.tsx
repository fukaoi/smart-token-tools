import { useState } from 'react';
import { Paper, Box, FormControl } from '@mui/material';
import { useForm } from 'react-hook-form';
import TitleTypography from '../components/typography/TitleTypography';
import AddressTypography from '../components/typography/AddressTypography';
import ClusterRadio from '../components/radio/ClusterRadio';
import TokenIssueTypeRadio from '../components/radio/TokenIssueTypeRadio';
import TotalSupplyTextField from '../components/textField/TotalSupplyTextField';
import DecimalsTextField from '../components/textField/DecimalsTextField';
import TokenKeyTextField from '../components/textField/TokenKeyTextField';
import SubmitButton from '../components/button/SubmitButton';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import { useSessionCheck } from '../hooks/SessionCheck';
import ErrorModal from '../components/modal/ErrorModal';
import { SplTokenPhantom } from '@solana-suite/phantom';

export interface FormValues {
  cluster: string;
  issueType: string;
  totalSupply: number;
  decimals: number;
  tokenKey?: string;
}

const mint = async (walletAddress: string, postData: FormValues) => {
  const res = await SplTokenPhantom.mint(
    walletAddress.toPublicKey(),
    postData.cluster,
    postData.totalSupply,
    postData.decimals,
    window.solana,
  );
  console.debug('mint: ', res);
  return res;
};

const addMinting = async (
  tokenKey: string,
  walletAddress: string,
  postData: FormValues,
) => {
  const res = await SplTokenPhantom.addMinting(
    tokenKey.toPublicKey(),
    walletAddress.toPublicKey(),
    postData.cluster,
    postData.totalSupply,
    postData.decimals,
    window.solana,
  );
  console.debug('add mint: ', res);
  return res;
};

const styles = {
  root: {
    marginTop: '1em',
    minWidth: '20em',
    maxWidth: '20em',
    padding: '1.2em',
  },
};

const TokenPage = () => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [btnState, setBtnState] = useState({
    title: 'Confirm',
    isDisabled: false,
  });
  const [errorModal, setErrorModal] = useState({ open: false, message: '' });
  const { handleSubmit, control, watch } = useForm<FormValues>({
    defaultValues: {
      cluster: 'devnet',
      issueType: 'new',
      totalSupply: 100000,
      decimals: 2,
      tokenKey: '',
    },
  });

  const handleClose = () => {
    setErrorModal({ open: false, message: '' });
    setBtnState({ title: 'Confirm', isDisabled: false });
  };

  const onSubmit = async (data: FormValues) => {
    console.log('data', data);
    setBtnState({ title: 'Processing', isDisabled: true });
    setIsLoading(true);

    let tokenId = '';
    if (data.issueType === 'new') {
      const res = await mint(walletAddress, data);
      if (res.isErr) {
        setIsLoading(false);
        setErrorModal({ open: true, message: res.error.message });
      } else {
        tokenId = res.value;
      }
    } else if (data.issueType === 'add' && data.tokenKey) {
      const res = await addMinting(data.tokenKey, walletAddress, data);
      if (res.isErr) {
        setIsLoading(false);
        setErrorModal({ open: true, message: res.error.message });
      } else {
        tokenId = res.value;
      }
    } else {
      setIsLoading(false);
      setErrorModal({ open: true, message: 'Error no match issue type' });
    }
    tokenId.length !== 0 && navigate('/complete', { state: { tokenId } });
  };

  useSessionCheck(setWalletAddress);

  return (
    <>
      <TitleTypography title="TOKEN" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Paper sx={styles.root}>
            <AddressTypography address={walletAddress} />
            <ClusterRadio control={control} name="cluster" />
            <Box sx={{ mb: 4 }} />
            <TokenIssueTypeRadio control={control} name="issueType" />
            <Box sx={{ mb: 4 }} />
            <TotalSupplyTextField control={control} name="totalSupply" />
            <Box sx={{ mb: 4 }} />
            <DecimalsTextField control={control} name="decimals" />
            {watch('issueType') === 'add' && (
              <>
                <Box sx={{ mb: 1 }} />
                <TokenKeyTextField control={control} name="tokenKey" />
              </>
            )}
          </Paper>
          <Box sx={{ mb: 6 }} />
          <Box>
            <SubmitButton
              isDisabled={btnState.isDisabled}
              title={btnState.title}
            />
          </Box>
          <Box sx={{ mb: 10 }} />
        </FormControl>
      </form>
      <ErrorModal
        open={errorModal.open}
        onClose={handleClose}
        message={errorModal.message}
      />
      <Loading isLoading={isLoading} />
    </>
  );
};
export default TokenPage;

import { useState } from 'react';
import { Box, FormControl, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import TitleTypography from '../components/typography/TitleTypography';
import { ValidatorError } from '@solana-suite/shared-metaplex';
import AddressTypography from '../components/typography/AddressTypography';
import ClusterRadio from '../components/radio/ClusterRadio';
import TokenIssueTypeRadio from '../components/radio/TokenIssueTypeRadio';
import TotalSupplyTextField from '../components/textField/TotalSupplyTextField';
import DecimalsTextField from '../components/textField/DecimalsTextField';
import TokenKeyTextField from '../components/textField/TokenKeyTextField';
import SubmitButton from '../components/button/SubmitButton';
import Loading from '../components/Loading';
import ErrorModal from '../components/modal/ErrorModal';
import NameTextField from '../components/textField/NameTextField';
import SymbolTextField from '../components/textField/SymbolTextField';
import HeadlineTypography from '../components/typography/HeadlineTypography';
import ImageFileUploadUI from '../components/uiParts/ImageFileUploadUI';
import { validationRules } from '../shared/validation';
import { addMinting, mintToken } from '../shared/tokenMint';
import { useNavigate } from 'react-router-dom';
import { useSessionCheck } from '../hooks/SessionCheck';

export type FormValues = {
  cluster: string;
  name: string;
  symbol: string;
  imagePreview?: string;
  issueType: string;
  totalSupply: number;
  decimals: number;
  tokenKey?: string;
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
  const [imagePreview, setImagePreview] = useState<File | string | undefined>(
    undefined,
  );
  const [fileBuffer, setFileBuffer] = useState<ArrayBuffer>();
  const { handleSubmit, control, watch } = useForm<FormValues>({
    defaultValues: {
      cluster: 'devnet',
      issueType: 'new',
      name: '',
      symbol: '',
      totalSupply: 100000,
      decimals: 1,
      tokenKey: '',
    },
  });

  const handleClose = () => {
    setErrorModal({ open: false, message: '' });
    setBtnState({ title: 'Confirm', isDisabled: false });
  };

  const onSubmit = async (data: FormValues) => {
    setBtnState({ title: 'Processing', isDisabled: true });
    setIsLoading(true);

    if (!fileBuffer) {
      setErrorModal({ open: true, message: 'Please Image Upload' });
    }

    try {
      let mint = '';
      if (data.issueType === 'new') {
        mint = await mintToken(
          fileBuffer!,
          data.name,
          data.symbol,
          walletAddress,
          data.cluster,
          data.totalSupply,
          data.decimals,
        );
      } else if (data.issueType === 'add' && data.tokenKey) {
        mint = await addMinting(
          data.tokenKey,
          walletAddress,
          data.cluster,
          data.totalSupply,
          data.decimals,
        );
      } else {
        setIsLoading(false);
        setErrorModal({ open: true, message: 'Error no match issue type' });
      }
      console.log('# mint: ', mint);
      mint.length !== 0 && navigate('/complete', { state: { mint } });
    } catch (error) {
      console.error(error);
      if (error instanceof ValidatorError) {
        console.error('validation error: ', error.details);
      }
      setBtnState({ title: 'Submit', isDisabled: false });
      setIsLoading(false);
      setErrorModal({ open: true, message: (error as Error).message });
    }
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
            {watch('issueType') === 'new' && (
              <>
                <Box sx={{ mb: 1 }} />
                <NameTextField<FormValues>
                  control={control}
                  name="name"
                  rules={validationRules.name}
                />
              </>
            )}
            <Box sx={{ mb: 4 }} />
            {watch('issueType') === 'new' && (
              <>
                <Box sx={{ mb: 1 }} />
                <SymbolTextField
                  control={control}
                  name="symbol"
                  rules={validationRules.symbol}
                />
              </>
            )}
            <Box sx={{ mb: 4 }} />
            <TotalSupplyTextField control={control} name="totalSupply" />
            <Box sx={{ mb: 4 }} />
            <DecimalsTextField control={control} name="decimals" />
            {watch('issueType') === 'add' && (
              <>
                <Box sx={{ mb: 4 }} />
                <TokenKeyTextField control={control} name="tokenKey" />
              </>
            )}
            <Box sx={{ mb: 4 }} />

            {watch('issueType') === 'new' && (
              <>
                <HeadlineTypography message="Image Upload" />
                <Box sx={{ mb: 4 }} />
                <ImageFileUploadUI
                  {...{
                    imagePreview,
                    setErrorModal,
                    setImagePreview,
                    setFileBuffer,
                  }}
                />
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

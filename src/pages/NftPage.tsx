import { useState } from 'react';
import { Paper, Box, FormControl } from '@mui/material';
import { Control, ControllerRenderProps, useForm } from 'react-hook-form';
import TitleTypography from '../components/typography/TitleTypography';
import AddressTypography from '../components/typography/AddressTypography';
import ClusterRadio from '../components/radio/ClusterRadio';
import SubmitButton from '../components/button/SubmitButton';
import { useSessionCheck } from '../hooks/SessionCheck';
import ErrorModal from '../components/modal/ErrorModal';
import NftNameTextField from '../components/textField/NftNameTextField';
import SymbolTextField from '../components/textField/SymbolTextField';
import OptionalButton from '../components/button/OptionalButton';
import DescriptionTextField from '../components/textField/DescriptionTextField';
import HeadlineTypography from '../components/typography/HeadlineTypography';
import FileUploadUI from '../components/FileUploadUI';
import OptionalUI from '../components/OptionalUI';
import Loading from '../components/Loading';
import { Validator, ValidatorError } from '@solana-suite/nft';
import { useNavigate } from 'react-router';
import { Metaplex } from '@solana-suite/phantom';

export interface NFTFormValues {
  cluster: string;
  nftName: string;
  symbol: string;
  description: string;
  imagePreview?: string;
  creators?: Creator[];
  royalty?: number;
  address?: string;
  verified?: boolean;
  share?: number;
  collection?: string;
  control?: Control<NFTFormValues>;
  field?: ControllerRenderProps;
  optional: any;
}

export interface Creator {
  address: string;
  verified: boolean;
  share: number;
}

const styles = {
  root: {
    marginTop: '1em',
    minWidth: '20em',
    maxWidth: '20em',
    padding: '1.2em',
  },
};

const NftPage = () => {
  useSessionCheck(console.log);
  const navigate = useNavigate();

  const [btnState, setBtnState] = useState({
    title: 'Confirm',
    isDisabled: false,
  });
  const [imagePreview, setImagePreview] = useState<File | string | undefined>(
    undefined,
  );
  const [fileBuffer, setFileBuffer] = useState<ArrayBuffer>();
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [optionalBtnState, setOptionalBtnState] = useState(false);
  const [errorModal, setErrorModal] = useState({ open: false, message: '' });
  const [isShow, setIsShow] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { handleSubmit, control, register } = useForm<NFTFormValues>({
    defaultValues: {
      cluster: 'devnet',
      royalty: 0,
      share: 0,
      verified: false,
      collection: 'Powered by ATONOY Co, Ltd',
      creators: [
        {
          address: '',
          share: 0,
          verified: false,
        },
      ],
    },
  });

  const handleClose = () => {
    setErrorModal({ open: false, message: '' });
    setBtnState({ title: 'Confirm', isDisabled: false });
  };

  const onSubmit = async (data: any) => {
    // setBtnState({ title: "Processing", isDisabled: true });
    setIsLoading(true);
    alert('on submit');
    console.log(data);
    setIsLoading(false);
    const mint = await Metaplex.mint(
      {
        filePath: fileBuffer!,
        name: data.nftName,
        symbol: data.symbol,
        description: data.description,
        royalty: 0,
        storageType: 'nftStorage',
      },
      window.solana,
    );

    mint.match(
      (ok: any) => console.log('mint: ', ok),
      (err: Error) => {
        console.error('err:', err);
        if ('details' in err) {
          console.error((err as ValidatorError).details);
        }
      },
    );
  };

  const handleOptionalButton = () => {
    setOptionalBtnState(prevState => !prevState);
    setIsShow(prevState => !prevState);
  };

  useSessionCheck(setWalletAddress);

  return (
    <>
      <TitleTypography title="NFT" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Paper sx={styles.root}>
            <AddressTypography address={walletAddress} />
            <ClusterRadio control={control} name="cluster" />
            <Box sx={{ mb: 4 }} />
            <NftNameTextField control={control} name="nftName" />
            <Box sx={{ mb: 4 }} />
            <SymbolTextField control={control} name="symbol" />
            <Box sx={{ mb: 4 }} />
            <DescriptionTextField control={control} name="description" />
            <Box sx={{ mb: 4 }} />
            <HeadlineTypography message="Image Upload" />
            <Box sx={{ mb: 4 }}>
              <FileUploadUI
                {...{ imagePreview, setImagePreview, setFileBuffer }}
              />
            </Box>
            <Box sx={{ mb: 4 }}>
              <OptionalButton
                isOpen={optionalBtnState}
                callbackFunc={handleOptionalButton}
              />
            </Box>
            <OptionalUI
              {...{
                isShow,
                control,
                register,
              }}
            />
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
export default NftPage;

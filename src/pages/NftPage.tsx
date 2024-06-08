import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Box, FormControl, Paper } from '@mui/material';
import { ValidatorError } from '@solana-suite/utils';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import TitleTypography from '../components/typography/TitleTypography';
import AddressTypography from '../components/typography/AddressTypography';
import ClusterRadio from '../components/radio/ClusterRadio';
import SubmitButton from '../components/button/SubmitButton';
import ErrorModal from '../components/modal/ErrorModal';
import NameTextField from '../components/textField/NameTextField';
import SymbolTextField from '../components/textField/SymbolTextField';
import OptionalButton from '../components/button/OptionalButton';
import DescriptionTextField from '../components/textField/DescriptionTextField';
import HeadlineTypography from '../components/typography/HeadlineTypography';
import ImageFileUploadUI from '../components/uiParts/ImageFileUploadUI';
import OptionalUI from '../components/uiParts/OptionalUI';
import Loading from '../components/Loading';
import { useSessionCheck } from '../hooks/SessionCheck';
import { validationRules } from '../shared/validation';
import { addCreator, creatorMint } from '../shared/nftMint';
import { MediaFiles, MediaFilesContext } from '../types/context';
import { InputNftMetadata } from '@solana-suite/phantom';

export type NFTFormValues = {
  cluster: string;
  nftName: string;
  symbol: string;
  description: string;
  imagePreview?: string;
  creators: Creator[];
  royalty?: number;
  control?: any;
  field?: ControllerRenderProps;
  optional?: any;
};

export type Creator = {
  address: string;
  share: number;
};

const styles = {
  root: {
    marginTop: '1em',
    minWidth: '20em',
    maxWidth: '20em',
    padding: '1.2em',
  },
};

const NftPage = () => {
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
  const [mediaFiles, setMediaFiles] = useState<MediaFiles[]>([]);

  useSessionCheck(setWalletAddress);

  const { handleSubmit, control } = useForm<NFTFormValues>({
    mode: 'onSubmit',
    defaultValues: {
      cluster: 'devnet',
      nftName: '',
      symbol: '',
      description: '',
      royalty: 0,
      creators: [
        {
          address: '',
          share: 0,
        },
      ],
    },
  });

  const handleClose = () => {
    setErrorModal({ open: false, message: '' });
    setBtnState({ title: 'Confirm', isDisabled: false });
  };

  const onSubmit = async (data: any) => {
    setBtnState({ title: 'Processing', isDisabled: true });
    setIsLoading(true);

    if (!fileBuffer) {
      setErrorModal({ open: true, message: 'Please Image Upload' });
    }

    try {
      let creators: InputNftMetadata.Creators[] = [];
      if (data.creators[0].address !== '') {
        creators = addCreator(data.creators);
        const sumShare = creators.reduce(
          (sum: number, i: { share: number }) => sum + i.share,
          0,
        );

        if (sumShare > 100) {
          setBtnState({ title: 'Submit', isDisabled: false });
          setIsLoading(false);
          setErrorModal({
            open: true,
            message: 'ERROR! Total Share Is 100 Over',
          });
          return;
        }
      }
      const mint = await creatorMint(
        fileBuffer!,
        data.nftName,
        data.symbol,
        data.description,
        data.royalty,
        data.cluster,
        creators,
        mediaFiles,
      );

      setBtnState({ title: 'Submit', isDisabled: false });
      setIsLoading(false);
      navigate('/nft-complete', { state: { mint } });
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
            <NameTextField<NFTFormValues>
              control={control}
              name="nftName"
              rules={validationRules.name}
            />
            <Box sx={{ mb: 4 }} />
            <SymbolTextField
              control={control}
              name="symbol"
              rules={validationRules.symbol}
            />
            <Box sx={{ mb: 4 }} />
            <DescriptionTextField
              control={control}
              name="description"
              rules={validationRules.description}
            />
            <Box sx={{ mb: 4 }} />
            <HeadlineTypography message="Image file Upload" />
            <Box sx={{ mb: 4 }} />
            <ImageFileUploadUI
              {...{
                imagePreview,
                setErrorModal,
                setImagePreview,
                setFileBuffer,
              }}
            />
            <Box sx={{ mb: 4 }} />
            <OptionalButton
              isOpen={optionalBtnState}
              callbackFunc={handleOptionalButton}
            />
            <MediaFilesContext.Provider
              value={{
                mediaFiles,
                setMediaFiles,
              }}
            >
              <OptionalUI
                {...{
                  isShow,
                  control,
                }}
              />
            </MediaFilesContext.Provider>
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

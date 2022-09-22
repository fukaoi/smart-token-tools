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
import { ValidatorError } from '@solana-suite/nft';
import { useNavigate } from 'react-router';
import { validationRules } from '../shared/validation';
import { MetaplexPhantom } from '@solana-suite/phantom';

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
  control?: Control<NFTFormValues>;
  field?: ControllerRenderProps;
  optional: any;
}

export type Creator = {
  address: string;
  verified: boolean;
  share: number;
}[];

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

  const { handleSubmit, control } = useForm<NFTFormValues>({
    mode: 'onSubmit',
    defaultValues: {
      cluster: 'devnet',
      name: '',
      symbol: '',
      description: '',
      royalty: 0,
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
    setBtnState({ title: 'Processing', isDisabled: true });
    setIsLoading(true);

    if (!fileBuffer) {
      setErrorModal({ open: true, message: 'Please Image Upload' });
    }

    try {
      console.log('data', data);

      if (data.creators[0].address !== '') {
        const creators = data.creators.map(item => {
          const address = item.address.toPublicKey();
          return {
            address,
            share: item.share,
            verified: item.verified,
          };
        });

        const mint = await MetaplexPhantom.mint(
          {
            filePath: fileBuffer!,
            name: data.name,
            symbol: data.symbol,
            description: data.description,
            royalty: data.royalty,
            creators,
            storageType: 'nftStorage',
            options: {
              powered_by: {
                name: 'Atonoy.inc',
                uri: 'https://atonoy.co',
              },
            },
          },
          data.cluster,
          window.solana,
        );

        mint.match(
          (ok: any) => {
            console.log('mint: ', ok);
          },
          (err: Error) => {
            console.error('err:', err);
            if ('details' in err) {
              console.error((err as ValidatorError).details);
            }
            setIsLoading(false);
            setErrorModal({ open: true, message: err.message });
          },
        );

        const res = mint.unwrap();

        navigate('/nftcomplete', { state: { res } });
      } else {
        const mint = await MetaplexPhantom.mint(
          {
            filePath: fileBuffer!,
            name: data.name,
            symbol: data.symbol,
            description: data.description,
            royalty: data.royalty,
            storageType: 'nftStorage',
            options: {
              powered_by: {
                name: 'Atonoy.inc',
                uri: 'https://atonoy.co',
              },
            },
          },
          data.cluster,
          window.solana,
        );

        mint.match(
          (ok: any) => {
            console.log('mint: ', ok);
          },
          (err: Error) => {
            console.error('err:', err);
            if ('details' in err) {
              console.error((err as ValidatorError).details);
              setErrorModal({ open: true, message: err.details });
            }
            setIsLoading(false);
            setErrorModal({ open: true, message: err.message });
          },
        );

        const res = mint.unwrap();

        setIsLoading(false);

        navigate('/nftcomplete', { state: { res } });
      }
    } catch (error) {
      console.log(error);
      setBtnState({ title: 'Submit', isDisabled: false });
      setIsLoading(false);
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
            <NftNameTextField
              control={control}
              name="name"
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
            <HeadlineTypography message="Image Upload" />
            <Box sx={{ mb: 4 }} />
            <FileUploadUI
              {...{ imagePreview, setImagePreview, setFileBuffer }}
            />
            <Box sx={{ mb: 4 }} />
            <OptionalButton
              isOpen={optionalBtnState}
              callbackFunc={handleOptionalButton}
            />
            <OptionalUI
              {...{
                isShow,
                control,
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

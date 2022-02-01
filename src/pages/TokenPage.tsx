import {useState, useEffect} from 'react';
import {makeStyles} from '@mui/styles';
import {Paper, Box, FormControl} from '@mui/material';
import {useForm} from 'react-hook-form';
import TitleTypography from '../components/typography/TitleTypography';
import AddressTypography from '../components/typography/AddressTypography';
import ClusterRadio from '../components/radio/ClusterRadio';
import TokenIssueTypeRadio from '../components/radio/TokenIssueTypeRadio';
import TotalSupplyTextField from '../components/textField/TotalSupplyTextField';
import DecimalsTextField from '../components/textField/DecimalsTextField';
import TokenKeyTextField from '../components/textField/TokenKeyTextField';
import SubmitButton from '../components/button/SubmitButton';
import {SplToken} from '../shared/spl-token';
import {useNavigate} from 'react-router-dom';

export interface FormValues {
  cluster: string,
  issueType: string,
  totalSupply: number,
  decimals: number,
  tokenKey?: string,
}

const mint = async (
  walletAddress: string,
  postData: FormValues,
) => {
  console.log('mint: ', walletAddress, postData);
  const sig = await SplToken.mint(
    walletAddress.toPublicKey(),
    postData.cluster,
    postData.totalSupply,
    postData.decimals,
    window.solana.signAllTransactions
  );
  console.debug('mint sig: ', sig);
  sig.isErr && alert(sig.error);
}

const addMinting = async (
  tokenKey: string,
  walletAddress: string,
  postData: FormValues,
) => {
  const sig = await SplToken.addMinting(
    tokenKey.toPublicKey(),
    walletAddress.toPublicKey(),
    postData.cluster,
    postData.totalSupply,
    postData.decimals,
    window.solana.signAllTransactions
  );
  console.debug('add minting sig: ', sig);
  sig.isErr && alert(sig.error);
}

const useStyles = makeStyles({
  root: {
    marginTop: '1em',
    minWidth: '20em',
    maxWidth: '20em',
    padding: '1.2em',
  },
});

const TokenPage = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const {handleSubmit, control, watch} = useForm<FormValues>({
    defaultValues: {
      cluster: 'devnet',
      issueType: 'new',
      totalSupply: 100000,
      decimals: 2,
      tokenKey: '',
    }
  });

  const [walletAddress, setWalletAddress] = useState<string>('');

  const onSubmit = async (data: FormValues) => {
    if (data.issueType === 'new') {
      await mint(walletAddress, data);
    } else if (data.issueType === 'add' && data.tokenKey) {
      await addMinting(data.tokenKey, walletAddress, data);
    } else {
      //todo: error
      alert('Error no match issue type');
    }
    navigate('/complete');
  }

  // Fetch wallet address
  useEffect(() => {
    const id = setInterval(() => {
      window.solana.connect().then((conn: any) => {
        setWalletAddress(conn.publicKey.toString());
      });
    }, 5000);

    return () => clearInterval(id);
  });

  return (
    <div>
      <TitleTypography title='TOKEN' />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Paper className={styles.root}>
            <AddressTypography address={walletAddress} />
            <ClusterRadio control={control} name='cluster' />
            <Box sx={{mb: 4}} />
            <TokenIssueTypeRadio control={control} name='issueType' />
            <Box sx={{mb: 4}} />
            <TotalSupplyTextField control={control} name='totalSupply' />
            <Box sx={{mb: 4}} />
            <DecimalsTextField control={control} name='decimals' />
            {
              watch('issueType') === 'add'
              &&
              <>
                <Box sx={{mb: 4}} />
                <TokenKeyTextField control={control} name='tokenKey' />
              </>
            }
          </Paper>
          <Box sx={{mb: 6}} />
          <div>
            <SubmitButton title='Confirm' />
          </div>
          <Box sx={{mb: 10}} />
        </FormControl>
      </form>
    </div>
  );
};
export default TokenPage;

import {useState} from 'react';
import {makeStyles} from '@mui/styles';
import {Paper, Box, FormControl} from '@mui/material';
import {useForm} from 'react-hook-form';

import TitleTypography from '../components/typography/TitleTypography';
import AddressTypography from '../components/typography/AddressTypography';
import CompletePage from './CompletePage';
import ClusterRadio from '../components/radio/ClusterRadio';
import TokenIssueTypeRadio from '../components/radio/TokenIssueTypeRadio';
import TotalSupplyTextField from '../components/textField/TotalSupplyTestField';
import DecimalsTextField from '../components/textField/DecimalsTestField';
import SubmitButton from '../components/button/SubmitButton';
import {SplToken} from '../adapters/spl-token';

interface TokenIssued {
  tokenKey: string,
  totalAmount: number
}

export interface FormValues {
  cluster: string,
  issueType: string,
  totalSupply: number,
  decimals: number,
}

const mint = async(
  walletAddress: string,
  postData: FormValues,
  setTokenIssued: (v: TokenIssued) => void,
) => {
  // window.solana.connect().then(async (wallet: any) => {
    const sig = await SplToken.mint(
      // wallet.publicKey,
      walletAddress.toPublicKey(),
      postData.cluster,
      postData.totalSupply,
      postData.decimals,
      window.solana.signAllTransactions
    );
    console.debug('tokenKey: ', sig);
    sig.isErr && alert(sig.error);
    setTokenIssued({tokenKey: sig.unwrap(), totalAmount: postData.totalSupply});
  // });
}

const useStyles = makeStyles({
  root: {
    marginTop: '1em',
    minWidth: '20em',
    maxWidth: '20em',
    padding: '1.2em',
  },
});

const isComplete = (tokenIssued: TokenIssued) => {
  return tokenIssued.tokenKey !== '' && tokenIssued.totalAmount !== 0;
}

const TokenPage = () => {
  const styles = useStyles();
  const {handleSubmit, control} = useForm<FormValues>({
    defaultValues: {
      cluster: 'devnet',
      issueType: 'add',
      totalSupply: 0,
      decimals: 1,
    }
  });
  const [walletAddress, setWalletAddress] = useState('');
  const [tokenIssued, setTokenIssued] = useState<TokenIssued>({tokenKey: '', totalAmount: 0});

  const onSubmit = (data: any) => {
    mint(walletAddress, data, setTokenIssued);
  }

  window.solana.connect().then((conn: any) => {
    setWalletAddress(conn.publicKey.toString());
  });

  const Root = () => (
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
  return !isComplete(tokenIssued) ? <Root /> : <CompletePage />;
};
export default TokenPage;

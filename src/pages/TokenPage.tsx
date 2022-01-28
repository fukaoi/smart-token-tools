import {useEffect, useState} from 'react';
import {makeStyles} from '@mui/styles';
import {Paper, Box, FormControl} from '@mui/material';

import TitleTypography from '../components/typography/TitleTypography';
import AddressTypography from '../components/typography/AddressTypography';
import CompletePage from './CompletePage';

import {SplToken} from '../adapters/spl-token';
import ClusterRadio from '../components/radio/ClusterRadio';
import TokenIssueTypeRadio from '../components/radio/TokenIssueTypeRadio';
import TotalSupplyTextField from '../components/textField/TotalSupplyTestField';
import DecimalsTextField from '../components/textField/DecimalsTestField';
import SubmitButton from '../components/button/SubmitButton';

interface TokenIssued {
  tokenKey: string,
  totalAmount: number
}

const mint = (setTokenIssued: (v: TokenIssued) => void) => {
  window.solana.connect().then(async (wallet: any) => {
    const tokenKey = await SplToken.mint(
      wallet.publicKey,
      100,
      1,
      window.solana.signAllTransactions
    );
    console.log('tokenKey: ', tokenKey);
    setTokenIssued({tokenKey: tokenKey.unwrap(), totalAmount: 100});
  });
}

const useStyles = makeStyles({
  root: {
    position: 'relative',
    marginTop: '1em',
    minWidth: '20em',
    maxWidth: '20em',
    padding: '1.2em',
  },
  radio: {
    '&$checked': {
      color: '#218010'
    }
  },
  checked: {}
});

const isComplete = (tokenIssued: TokenIssued) => {
  return tokenIssued.tokenKey !== '' && tokenIssued.totalAmount !== 0;
}

const TokenPage = () => {
  const styles = useStyles();
  const [walletAddress, setWalletAddress] = useState('');
  const [tokenIssued, setTokenIssued] = useState<TokenIssued>({tokenKey: '', totalAmount: 0});
  useEffect(() => {
    // mint(setTokenIssued);
  }, []);

  window.solana.connect().then((conn: any) => {
    setWalletAddress(conn.publicKey.toString());
  });

  const Root = () => (
    <div>
      <TitleTypography title='TOKEN' />
      <FormControl>
        <Paper className={styles.root}>
          <AddressTypography address={walletAddress} />
          <ClusterRadio />
          <Box sx={{mb: 4}} />
          <TokenIssueTypeRadio />
          <Box sx={{mb: 4}} />
          <TotalSupplyTextField />
          <Box sx={{mb: 4}} />
          <DecimalsTextField />
        </Paper>
        <Box sx={{mb: 6}} />
        <div>
          <SubmitButton callbackFunc={console.log} title='Submit' />
        </div>
        <Box sx={{mb: 10}} />
      </FormControl>
    </div>
  );
  return !isComplete(tokenIssued) ? <Root /> : <CompletePage />;
};
export default TokenPage;

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

interface PostData {
  cluster: string,
  network: string,
  totalSupply: number,
  decimals: number,
}

interface ErrorPostData {
  cluster: false,
  network: false,
  totalSupply: false,
  decimals: false,
}

const mint = (setTokenIssued: (v: TokenIssued) => void, postData: PostData) => {
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
    marginTop: '1em',
    minWidth: '20em',
    maxWidth: '20em',
    padding: '1.2em',
  },
});

const isComplete = (tokenIssued: TokenIssued) => {
  return tokenIssued.tokenKey !== '' && tokenIssued.totalAmount !== 0;
}

const isValidateError = (errorPostData: ErrorPostData) => 
  Object.values(errorPostData).includes(true);

const TokenPage = () => {
  const styles = useStyles();
  const [walletAddress, setWalletAddress] = useState('');
  const [tokenIssued, setTokenIssued] = useState<TokenIssued>({tokenKey: '', totalAmount: 0});

  window.solana.connect().then((conn: any) => {
    setWalletAddress(conn.publicKey.toString());
  });

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (ev) => {
    const formData = new FormData(ev.currentTarget);
    ev?.preventDefault();
    const postData: PostData = {cluster: '', network: '', totalSupply: 0, decimals: 0};
    const errorPostData: ErrorPostData = {cluster: false, network: false, totalSupply: false, decimals: false};
    for (const [key, value] of formData.entries()) {
      switch (key) {
        case 'cluster':
          //validation check
          postData.cluster = value.toString();
          errorPostData.cluster = false;
          break;
        case 'network':
          //validation check
          postData.cluster = value.toString();
          break;
        case 'total-supply':
          //validation check
          postData.totalSupply = parseInt(value.toString());
          break
        case 'decimals':
          //validation check
          postData.decimals = parseInt(value.toString());
          break
        default:
          //error
          throw Error('No matched error');
      }
    }
    !isValidateError && mint(setTokenIssued, postData);
  }

  const Root = () => (
    <div>
      <TitleTypography title='TOKEN' />
      <form name='issue-token' onSubmit={onSubmit}>
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
            <SubmitButton callbackFunc={() => {}} title='Submit' />
          </div>
          <Box sx={{mb: 10}} />
        </FormControl>
      </form>
    </div>
  );
  return !isComplete(tokenIssued) ? <Root /> : <CompletePage />;
};
export default TokenPage;

import {useEffect, useState} from 'react';
import {makeStyles} from '@mui/styles';
import FormControl from '@mui/material/FormControl';
import {Paper} from '@mui/material';

import PageTitle from '../components/PageTitle';
import WalletAddress from '../components/WalletAddress';
import Complete from './Complete';

import {SplToken} from '../shared/spl-token';
import ClusterRadio from '../components/radio/ClusterRadio';
import TokenIssueTypeRadio from '../components/radio/TokenIssueTypeRadio';

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

const Token = () => {
  const styles = useStyles();
  const [walletAddress, setWalletAddress] = useState('');
  const [tokenIssued, setTokenIssued] = useState<TokenIssued>({tokenKey: '', totalAmount: 0});
  useEffect(() => {
    mint(setTokenIssued);
  }, []);

  window.solana.connect().then((conn: any) => {
    setWalletAddress(conn.publicKey.toString());
  });

  const Root = () => (
    <div>
      <PageTitle title='TOKEN' />
      <FormControl>
        <Paper className={styles.root}>
          <WalletAddress address={walletAddress} />
          <ClusterRadio />
          <br />
          <TokenIssueTypeRadio />
        </Paper>
      </FormControl>
    </div>
  );
  return !isComplete(tokenIssued) ? <Root /> : <Complete />;
};
  export default Token;

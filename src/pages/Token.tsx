import assert from 'assert';
import {useEffect, useState} from 'react';
import {makeStyles} from '@mui/styles';
import Typography from '@mui/material/Typography';
import {SplToken} from '../solanaSuites/spl-token';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import {Paper} from '@mui/material';

import PageTitle from '../components/PageTitle';
import WalletAddress from '../components/WalletAddress';

const mint = () => {
  window.solana.connect().then(async (wallet: any) => {
    const sig = await SplToken.createMint(
      wallet.publicKey,
      1,
      window.solana.signTransaction
    );
    sig.isErr && assert(sig);
  });
}

const useStyles = makeStyles({
  root: {
    position: 'relative',
    marginTop: '1em',
    minWidth: '25em',
    maxWidth: '25em',
    padding: '1.2em',
    alignItems: 'center',
    justifyItems: 'ceter',
  },
  radio: {
    '&$checked': {
      color: '#218010'
    }
  },
  checked: {}
});

const Token = () => {
  const styles = useStyles();
  const [walletAddress, setWalletAddress] = useState('');
  useEffect(() => {

    // mint();
  }, []);

  window.solana.connect().then((conn: any) => {
    setWalletAddress(conn.publicKey.toString());
  });

  return (
    <div>
      <PageTitle title='TOKEN' />
      <FormControl>
        <Paper className={styles.root}>
          <WalletAddress address={walletAddress} />
          <Typography variant='h4'>Select your using network cluster</Typography>
          <RadioGroup
            aria-labelledby='cluster'
            defaultValue='devnet'
            name='cluster'
          >
            <FormControlLabel value='mainnet-beta' control={<Radio />} label='Mainnet-beta' />
            <FormControlLabel value='devnet' control={<Radio />} label='Devnet' />
            <FormControlLabel value='testnet' control={<Radio />} label='Testnet' />
          </RadioGroup>
        </Paper>
      </FormControl>
    </div>
  );
};
export default Token;

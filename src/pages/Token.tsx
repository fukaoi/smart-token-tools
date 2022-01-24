import assert from 'assert';
import {useEffect, useState} from 'react';
import {makeStyles} from '@mui/styles';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import {Paper} from '@mui/material';

import PageTitle from '../components/PageTitle';
import WalletAddress from '../components/WalletAddress';

import {SplToken} from '../shared/spl-token';

const mint = () => {
  window.solana.connect().then(async (wallet: any) => {
    const tokenKey = await SplToken.createMint(
      wallet.publicKey,
      1,
      window.solana.signTransaction
    );
    tokenKey.isErr && assert(tokenKey);
    console.log('tokenKey: ', tokenKey.unwrap());
    await SplToken.mint(
      tokenKey.unwrap().toPublicKey(),
      wallet.publicKey,
      100,
      1,
      window.solana.signTransaction
    );
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

const Token = () => {
  const styles = useStyles();
  const [walletAddress, setWalletAddress] = useState('');
  useEffect(() => {
    mint();
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
          <Typography align='left' variant='h5'>Select your using network cluster</Typography>
          <RadioGroup
            aria-labelledby='cluster'
            defaultValue='devnet'
            name='cluster'
          >
            <FormControlLabel value='mainnet-beta' control={<Radio color='secondary' />} label='Mainnet-beta' />
            <FormControlLabel value='devnet' control={<Radio color='warning' />} label='Devnet' />
            <FormControlLabel value='testnet' control={<Radio color='primary' />} label='Testnet' />
          </RadioGroup>
          <br />
          <Typography align='left' variant='h5'>Select token issue type</Typography>
          <RadioGroup
            aria-labelledby='cluster'
            defaultValue='new'
            name='issue'
          >
            <FormControlLabel value='new' control={<Radio />} label='New' />
            <FormControlLabel value='add' control={<Radio />} label='Add' />
          </RadioGroup>

        </Paper>
      </FormControl>
    </div>
  );
};
export default Token;

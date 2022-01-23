import assert from 'assert';
import {useEffect} from 'react';
import {makeStyles} from '@mui/styles';
import Typography from '@mui/material/Typography';
import {SplToken} from '../solanaSuites/spl-token';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import {Paper} from '@mui/material';

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
    marginTop: '10em',
    minWidth: '20em',
    maxWidth: '20em',
    padding: '2em',
  },
  radio: {
    '&$checked': {
      color: '#fffff'
    }
  },
  checked: {}
});

const Token = () => {
  const styles = useStyles();
  useEffect(() => {
    // mint();
  }, []);

  return (
    <div>
      <FormControl>
        <Paper elevation={10} className={styles.root}>
          <Typography variant='h4' sx={{mb: 5}}>Select your using network cluster</Typography>
          <RadioGroup
            aria-labelledby='cluster'
            defaultValue='devnet'
            name='cluster'
            className={styles.radio}
            color='info'
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

import {makeStyles} from '@mui/styles';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const useStyles = makeStyles({
  headline: {
    padding: '5px 10px',
    borderLeft: '3px solid #aaaaaa',
    background: '#f4f4f4'
  },
});


const ClusterRadio = () => {
  const styles = useStyles();
  return (
    <div>
      <Typography align='left' variant='h5' className={styles.headline}>Select your using network cluster</Typography>
      <RadioGroup
        aria-labelledby='cluster'
        defaultValue='devnet'
        name='cluster'
      >
        <FormControlLabel value='mainnet-beta' control={<Radio color='secondary' />} label='Mainnet-beta' />
        <FormControlLabel value='devnet' control={<Radio color='warning' />} label='Devnet' />
        <FormControlLabel value='testnet' control={<Radio color='primary' />} label='Testnet' />
      </RadioGroup>
    </div>
  );
};

export default ClusterRadio;

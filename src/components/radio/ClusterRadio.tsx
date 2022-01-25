import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const ClusterRadio = () => {
  return (
    <div>
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
    </div>
  );
};

export default ClusterRadio;

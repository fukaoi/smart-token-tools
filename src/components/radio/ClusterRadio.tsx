import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import HeadlineTypography from '../typography/HeadlineTypography';

const ClusterRadio = () => {
  return (
    <>
      <HeadlineTypography message='Select your using network cluster' />
      <RadioGroup
        aria-labelledby='cluster'
        defaultValue='devnet'
        name='cluster'
      >
        <FormControlLabel value='mainnet-beta' control={<Radio color='secondary' />} label='Mainnet-beta' />
        <FormControlLabel value='devnet' control={<Radio color='warning' />} label='Devnet' />
        <FormControlLabel value='testnet' control={<Radio color='primary' />} label='Testnet' />
      </RadioGroup>
    </>
  );
};

export default ClusterRadio;

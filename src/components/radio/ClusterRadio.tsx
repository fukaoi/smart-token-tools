import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import HeadlineTypography from '../typography/HeadlineTypography';
import { useController, UseControllerProps } from 'react-hook-form';
import { Constants } from '@solana-suite/shared';

const ClusterRadio = (props: UseControllerProps<any>) => {
  const { field } = useController(props);
  return (
    <>
      <HeadlineTypography message="Select your using network cluster" />
      <RadioGroup
        aria-labelledby="cluster"
        defaultValue={Constants.Cluster.dev}
        {...field}
      >
        <FormControlLabel
          value={Constants.Cluster.prdMetaplex}
          control={<Radio color="secondary" />}
          label="Mainnet-beta"
        />
        <FormControlLabel
          value={Constants.Cluster.dev}
          control={<Radio color="warning" />}
          label="Devnet"
        />
        <FormControlLabel
          value={Constants.Cluster.test}
          control={<Radio color="primary" />}
          label="Testnet"
        />
      </RadioGroup>
    </>
  );
};

export default ClusterRadio;

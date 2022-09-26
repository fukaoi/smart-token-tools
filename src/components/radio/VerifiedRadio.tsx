import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { NFTFormValues } from '../../pages/NftPage';
import { useController, UseControllerProps } from 'react-hook-form';

const VerifiedRadio = (props: UseControllerProps<NFTFormValues>) => {
  const { field } = useController(props);
  return (
    <>
      <RadioGroup aria-labelledby="issueType" defaultValue="false" {...field}>
        <FormControlLabel value="true" control={<Radio />} label="True" />
        <FormControlLabel value="false" control={<Radio />} label="False" />
      </RadioGroup>
    </>
  );
};

export default VerifiedRadio;

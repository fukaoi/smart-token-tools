import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import HeadlineTypography from '../typography/HeadlineTypography';
import {FormValues} from '../../pages/TokenPage';
import {useController, UseControllerProps} from 'react-hook-form';

const TokenIssueTypeRadio = (props: UseControllerProps<FormValues>) => {
  const {field, fieldState} = useController(props);
  return (
    <>
      <HeadlineTypography message='Select token issue type' />
      <RadioGroup
        aria-labelledby='issueType'
        defaultValue='new'
        {...field}
      >
        <FormControlLabel 
          value='new' 
          control={<Radio />} 
          label='New' 
        />
        <FormControlLabel 
          value='add' 
          control={<Radio />} 
          label='Add' 
        />
      </RadioGroup>
    </>
  );
};

export default TokenIssueTypeRadio;

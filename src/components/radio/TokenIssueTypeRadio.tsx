import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import HeadlineTypography from '../typography/HeadlineTypography';

const TokenIssueTypeRadio = () => {
  return (
    <>
      <HeadlineTypography message='Select token issue type' />
      <RadioGroup
        aria-labelledby='issue'
        defaultValue='new'
        name='issue'
        onClick={()=> alert(1)}
      >
        <FormControlLabel value='new' control={<Radio />} label='New' />
        <FormControlLabel value='add' control={<Radio />} label='Add' />
      </RadioGroup>
    </>
  );
};

export default TokenIssueTypeRadio;

import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const TokenIssueTypeRadio = () => {
  return (
    <div>
      <Typography align='left' variant='h5'>Select token issue type</Typography>
      <RadioGroup
        aria-labelledby='issue'
        defaultValue='new'
        name='issue'
        onClick={()=> alert(1)}
      >
        <FormControlLabel value='new' control={<Radio />} label='New' />
        <FormControlLabel value='add' control={<Radio />} label='Add' />
      </RadioGroup>
    </div>
  );
};

export default TokenIssueTypeRadio;

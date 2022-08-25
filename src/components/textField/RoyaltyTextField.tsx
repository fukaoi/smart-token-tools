import {TextField, Box} from '@mui/material';
import HeadlineTypography from '../typography/HeadlineTypography';
import DescriptionTypography from '../typography/DescriptionTypography';
import ExampleTypography from '../typography/ExampleTypography';
import {FormValues} from '../../pages/TokenPage';
import {useController, UseControllerProps} from 'react-hook-form';

const DecimalsTextField = (props: UseControllerProps<FormValues>) => {
  const {field} = useController(props);
  const description =
    `The value of this setting specifies the number of decimal points in the token. 
     Please refer to the example below.`;
  const example =
    `
     1 decimals:  1000,     10000,         1
     2 decimals:  1000.0,   10000.0,     0.1
     3 decimals:  1000.00,  10000.00,   0.01
     4 decimals:  1000.000, 10000.000, 0.001
    `;
  return (
    <>
      <HeadlineTypography message='Input token decimals' />
      <DescriptionTypography message={description} />
      <ExampleTypography example={example} />
      <Box sx={{display: 'flex', mt: 2}}>
        <TextField
          type='text'
          minRows={100}
          id='outlined-basic'
          label='decimals'
          placeholder='1, 2, 3,,,'
          variant='outlined'
          size='small'
          error={false}
          {...field}
        />
      </Box>
    </>
  );
}

export default DecimalsTextField;

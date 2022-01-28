import {FC} from 'react';
import {FormControl, TextField, Box} from '@mui/material';
import HeadlineTypography from '../typography/HeadlineTypography';
import DescriptionTypography from '../typography/DescriptionTypography';
import ExampleTypography from '../typography/ExampleTypography';

const DecimalsTextField: FC<{}> = ({}) => {
  const description =
    `The value of this setting specifies the number of decimal points in the token. 
     Please refer to the example below.`;
  const example = 
    `
    input 1 decimals: => 1000, 10000, 1
    input 2 decimals: => 1000.0, 10000.0, 0.1
    input 3 decimals: => 1000.00, 10000.00, 0.01
    input 4 decimals: => 1000.000, 10000.000, 0.001
    `;
  return (
    <>
      <HeadlineTypography message='Input token decimals' />
      <DescriptionTypography message={description} />
      <ExampleTypography example={example} />
      <Box sx={{display: 'flex', mt: 2}}>
        <FormControl>
          <TextField
            type='number'
            id='outlined-basic'
            label='decimals'
            placeholder='1, 2, 3,,,'
            variant='outlined'
            size='small'
          />
        </FormControl>
      </Box>
    </>
  );
}

export default DecimalsTextField;

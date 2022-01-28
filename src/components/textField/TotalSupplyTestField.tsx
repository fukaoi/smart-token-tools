import {FC} from 'react';
import {FormControl, TextField, Box} from '@mui/material';
import HeadlineTypography from '../typography/HeadlineTypography';

const TotalSupplyTextField: FC<{}> = ({}) => {
  return (
    <>
      <HeadlineTypography message='Input total supply number' />
      <Box sx={{display: 'flex', mt: 2}}>
        <FormControl>
          <TextField
            type='number'
            id='outlined-basic'
            label='total supply'
            placeholder='e.g: 100000, 99999999'
            variant='outlined'
            size='small'
          />
        </FormControl>
      </Box>
    </>
  );
}

export default TotalSupplyTextField;

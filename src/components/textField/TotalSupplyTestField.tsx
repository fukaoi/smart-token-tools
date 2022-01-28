import {FC} from 'react';
import {TextField, Box} from '@mui/material';
import HeadlineTypography from '../typography/HeadlineTypography';

const TotalSupplyTextField: FC<{}> = ({}) => {
  return (
    <>
      <HeadlineTypography message='Input total supply number' />
      <Box sx={{display: 'flex', mt: 2}}>
        <TextField
          name='total-supply'
          type='number'
          id='outlined-basic'
          label='total supply'
          placeholder='100000, 99999999,,,'
          variant='outlined'
          size='small'
          required
          error={false}
        />
      </Box>
    </>
  );
}

export default TotalSupplyTextField;

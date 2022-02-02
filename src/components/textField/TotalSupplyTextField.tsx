import {TextField, Box} from '@mui/material';
import HeadlineTypography from '../typography/HeadlineTypography';
import {FormValues} from '../../pages/TokenPage';
import {useController, UseControllerProps} from 'react-hook-form';

const TotalSupplyTextField = (props: UseControllerProps<FormValues>) => {
  const {field} = useController(props);
  return (
    <>
      <HeadlineTypography message='Input total supply number' />
      <Box sx={{display: 'flex', mt: 2}}>
        <TextField
          type='text'
          id='outlined-basic'
          label='total supply'
          placeholder='100000, 99999999,,,'
          variant='outlined'
          size='small'
          required
          error={false}
          {...field}
        />
      </Box>
    </>
  );
}

export default TotalSupplyTextField;

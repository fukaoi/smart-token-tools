import {TextField, Box} from '@mui/material';
import HeadlineTypography from '../typography/HeadlineTypography';
import {FormValues} from '../../pages/TokenPage';
import {useController, UseControllerProps} from 'react-hook-form';

const TotalSupplyTextField = (props: UseControllerProps<FormValues>) => {
  const {field, fieldState} = useController(props);
  return (
    <>
      <HeadlineTypography message='Input existed tokenKey' />
      <Box sx={{display: 'flex', mt: 2}}>
        <TextField
          type='text'
          id='outlined-basic'
          label='tokenKey'
          placeholder='xxxAzoHMxxxn8by8oxxx'
          variant='outlined'
          size='small'
          fullWidth
          required
          error={false}
          {...field}
        />
      </Box>
    </>
  );
}

export default TotalSupplyTextField;

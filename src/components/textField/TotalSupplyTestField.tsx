import {TextField, Box} from '@mui/material';
import HeadlineTypography from '../typography/HeadlineTypography';
import {FormValues} from '../../pages/TokenPage';
import {useController, UseControllerProps} from 'react-hook-form';

const TotalSupplyTextField = (props: UseControllerProps<FormValues>) => {
  const {field: {ref, ...rest}, fieldState} = useController(props);
  const { name, control, rules, ...textFieldProps } = props;
  return (
    <>
      <HeadlineTypography message='Input total supply number' />
      <Box sx={{display: 'flex', mt: 2}}>
  <TextField
      inputRef={ref}
      {...rest}
      {...textFieldProps}
    />
        {/*<TextField
          name='totalSupply'
          type='number'
          id='outlined-basic'
          label='total supply'
          placeholder='100000, 99999999,,,'
          variant='outlined'
          size='small'
          required
          error={false}
        />
          */}
      </Box>
    </>
  );
}

export default TotalSupplyTextField;

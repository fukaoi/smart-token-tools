import { TextField, Box } from '@mui/material';
import HeadlineTypography from '../typography/HeadlineTypography';
import { NFTFormValues } from '../../pages/NftPage';
import { useController, UseControllerProps } from 'react-hook-form';

const SymbolTextField = (props: UseControllerProps<NFTFormValues>) => {
  const { field, fieldState } = useController(props);
  return (
    <>
      <HeadlineTypography message="Input Symbol" />
      <Box sx={{ display: 'flex', mt: 2 }}>
        <TextField
          type="text"
          id="outlined-basic"
          label="Input Symbol"
          placeholder="SYMBOL"
          variant="outlined"
          size="small"
          error={fieldState.invalid}
          helperText={fieldState.error?.message}
          {...field}
        />
      </Box>
    </>
  );
};

export default SymbolTextField;

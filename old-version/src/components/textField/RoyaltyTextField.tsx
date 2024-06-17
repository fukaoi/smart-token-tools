import { TextField, Box } from '@mui/material';
import HeadlineTypography from '../typography/HeadlineTypography';
import { NFTFormValues } from '../../pages/NftPage';
import { useController, UseControllerProps } from 'react-hook-form';

const RoyaltyTextField = (props: UseControllerProps<NFTFormValues>) => {
  const { field, fieldState } = useController(props);
  return (
    <>
      <HeadlineTypography message="Input Royalty" />
      <Box sx={{ display: 'flex', mt: 2 }}>
        <TextField
          type="text"
          minRows={100}
          id="outlined-basic"
          label="Royalty"
          placeholder="1, 2, 3,,,"
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

export default RoyaltyTextField;

import { TextField, Box } from '@mui/material';
import HeadlineTypography from '../typography/HeadlineTypography';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

const NameTextField = <T extends FieldValues>(props: UseControllerProps<T>) => {
  const { field, fieldState } = useController(props);
  console.log(fieldState);
  return (
    <>
      <HeadlineTypography message="Input NFT name" />
      <Box sx={{ display: 'flex', mt: 2 }}>
        <TextField
          type="text"
          id="outlined-basic"
          label="Input NFT name"
          placeholder="NFT name..."
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

export default NameTextField;

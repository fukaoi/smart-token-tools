import { TextField, Box } from '@mui/material';
import HeadlineTypography from '../typography/HeadlineTypography';
import { NFTFormValues } from '../../pages/NftPage';
import { useController, UseControllerProps } from 'react-hook-form';

const DescriptionTextField = (props: UseControllerProps<NFTFormValues>) => {
  const { field, fieldState } = useController(props);
  return (
    <>
      <HeadlineTypography message="Input Description" />
      <Box sx={{ display: 'flex', mt: 2 }}>
        <TextField
          type="text"
          id="outlined-basic"
          label="Input Description"
          placeholder="Description"
          variant="outlined"
          size="small"
          multiline
          rows={4}
          error={fieldState.invalid}
          helperText={fieldState.error?.message}
          {...field}
          style={{ width: 480 }}
        />
      </Box>
    </>
  );
};

export default DescriptionTextField;

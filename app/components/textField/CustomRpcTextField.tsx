import { Box, TextField } from "@mui/material";
import HeadlineTypography from "../typography/HeadlineTypography";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

const CustomRpcTextFiled = <T extends FieldValues>(
  props: UseControllerProps<T>,
) => {
  const { field, fieldState } = useController(props);
  return (
    <>
      <HeadlineTypography message={'Custom RPC URL'} />
      <Box sx={{ display: "flex", mt: 2 }}>
        <TextField
          type="text"
          id="outlined-basic"
          label={'custom-rpc-url'}
          placeholder="original name..."
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

export default CustomRpcTextFiled;

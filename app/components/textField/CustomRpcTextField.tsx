import { Box, TextField } from "@mui/material";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { TokenMetadata } from "~/types";

const CustomRpcTextFiled = <T extends TokenMetadata>(
  props: UseControllerProps<T>,
) => {
  const { field, fieldState } = useController(props);
  return (
    <>
      <Box sx={{ display: "flex", mb: 2 }}>
        <TextField
          type="text"
          id="outlined-basic"
          label="customClusterUrl"
          placeholder="https://..."
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

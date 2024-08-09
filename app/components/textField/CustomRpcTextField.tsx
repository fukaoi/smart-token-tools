import { Box, TextField } from "@mui/material";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

const CustomRpcTextFiled = <T extends FieldValues>(
  props: UseControllerProps<T>,
) => {
  const { field } = useController(props);
  return (
    <>
      <Box sx={{ display: "flex", mb: 2 }}>
        <TextField
          type="text"
          id="outlined-basic"
          label="custom-rpc-url"
          placeholder="https://..."
          variant="outlined"
          size="small"
          error={false}
          {...field}
        />
      </Box>
    </>
  );
};

export default CustomRpcTextFiled;

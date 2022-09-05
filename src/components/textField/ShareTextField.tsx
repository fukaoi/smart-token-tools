import { TextField, Box } from "@mui/material";
import { FormValues } from "../../pages/NftPage";
import { useController, UseControllerProps } from "react-hook-form";

const ShareTextField = (props: UseControllerProps<FormValues>) => {
  const { field } = useController(props);
  return (
    <>
      <Box sx={{ display: "flex", mt: 2 }}>
        <TextField
          type="text"
          minRows={100}
          id="outlined-basic"
          label="Share"
          placeholder="1, 2, 3,,,"
          variant="outlined"
          size="small"
          error={false}
          {...field}
        />
      </Box>
    </>
  );
};

export default ShareTextField;

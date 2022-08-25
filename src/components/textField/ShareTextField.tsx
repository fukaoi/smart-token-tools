import { TextField, Box } from "@mui/material";
import HeadlineTypography from "../typography/HeadlineTypography";
import { FormValues } from "../../pages/NftPage";
import { useController, UseControllerProps } from "react-hook-form";

const ShareTextField = (props: UseControllerProps<FormValues>) => {
  const { field } = useController(props);
  return (
    <>
      <HeadlineTypography message="Input Share" />
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

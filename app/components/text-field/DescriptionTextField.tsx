import { Box, TextField } from "@mui/material";
import SugbHeadlineTypography from "../typography/HeadlineTypography";
import type { NFTMetadata } from "~/types";
import { useController, type UseControllerProps } from "react-hook-form";

const DescriptionTextField = (props: UseControllerProps<NFTMetadata>) => {
  const { field, fieldState } = useController(props);
  return (
    <>
      <SugbHeadlineTypography message="Input Description" />
      <Box sx={{ display: "flex", mt: 2 }}>
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

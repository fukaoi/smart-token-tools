import { Box, TextField } from "@mui/material";
import HeadlineTypography from "~/components/typography/HeadlineTypography";
import type { TokenMetadata } from "~/types";
import { useController, type UseControllerProps } from "react-hook-form";

const MetadataJsonUrlTextField = (props: UseControllerProps<TokenMetadata>) => {
  const { field } = useController(props);
  return (
    <>
      <Box sx={{ display: "flex", mt: 2 }}>
        <TextField
          type="text"
          id="outlined-basic"
          label="token address"
          placeholder="https://xxxxxx"
          variant="outlined"
          size="small"
          fullWidth
          required
          error={false}
          {...field}
        />
      </Box>
    </>
  );
};

export default MetadataJsonUrlTextField;

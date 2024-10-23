import { Box, TextField } from "@mui/material";
import HeadlineTypography from "~/components/typography/HeadlineTypography";
import type { TokenMetadata } from "~/types";
import { useController, type UseControllerProps } from "react-hook-form";
import UsageTypography from "../typography/UsageTypography";

const MetadataJsonUrlTextField = (props: UseControllerProps<TokenMetadata>) => {
  const { field } = useController(props);
  const description =
    "Enter the URL of the JSON file that contains the metadata of the token you want to add.";
  return (
    <>
      <UsageTypography message={description} />
      <Box sx={{ display: "flex", mt: 2 }}>
        <TextField
          type="text"
          id="outlined-basic"
          label="Metadata JSON URL"
          placeholder="https://..."
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

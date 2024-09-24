import { Box, TextField } from "@mui/material";
import HeadlineTypography from "~/components/typography/HeadlineTypography";
import type { TokenMetadata } from "~/types";
import { useController, type UseControllerProps } from "react-hook-form";

const TotalSupplyTextField = (props: UseControllerProps<TokenMetadata>) => {
  const { field } = useController(props);
  return (
    <>
      <HeadlineTypography message="Input total supply number" />
      <Box sx={{ display: "flex", mt: 2 }}>
        <TextField
          type="number"
          id="outlined-basic"
          label="total supply"
          placeholder="100000, 99999999,,,"
          variant="outlined"
          size="small"
          required
          error={false}
          {...field}
        />
      </Box>
    </>
  );
};

export default TotalSupplyTextField;

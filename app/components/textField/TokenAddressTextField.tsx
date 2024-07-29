import { Box, TextField } from "@mui/material";
import HeadlineTypography from "~/components/typography/HeadlineTypography";
import { TokenFormValues } from "~/types";
import { useController, UseControllerProps } from "react-hook-form";

const TotalSupplyTextField = (props: UseControllerProps<TokenFormValues>) => {
  const { field } = useController(props);
  return (
    <>
      <HeadlineTypography message="Input minted token address" />
      <Box sx={{ display: "flex", mt: 2 }}>
        <TextField
          type="text"
          id="outlined-basic"
          label="token address"
          placeholder="xxxAzoHMxxxn8by8oxxx"
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

export default TotalSupplyTextField;

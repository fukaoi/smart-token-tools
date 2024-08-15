import { Box, TextField } from "@mui/material";
import SugbHeadlineTypography from "~/components/typography/HeadlineTypography";
import DescriptionTypography from "~/components/typography/DescriptionTypography";
import ExampleTypography from "~/components/typography/ExampleTypography";
import { useController, UseControllerProps } from "react-hook-form";
import { TokenMetadata } from "~/types";

const DecimalsTextField = (props: UseControllerProps<TokenMetadata>) => {
  const { field } = useController(props);
  const description =
    `The value of this setting specifies the number of decimal points in the token. 
     Please refer to the example below.`;
  const example = `
     0 decimals:  1000,                   1
     1 decimals:  1000.0,                0.1
     2 decimals:  1000.00,              0.01
     3 decimals:  1000.000,            0.001
     4 decimals:  1000.0000,          0.0001
     5 decimals:  1000.00000,        0.00001
     7 decimals:  1000.000000,      0.000001
     8 decimals:  1000.0000000,    0.0000001
     9 decimals:  1000.00000000,  0.00000001
    `;
  return (
    <>
      <SugbHeadlineTypography message="Input token decimals" />
      <DescriptionTypography message={description} />
      <ExampleTypography example={example} />
      <Box sx={{ display: "flex", mt: 2 }}>
        <TextField
          type="text"
          minRows={100}
          id="outlined-basic"
          label="decimals"
          placeholder="0, 1, 2,,,"
          variant="outlined"
          size="small"
          error={false}
          {...field}
        />
      </Box>
    </>
  );
};

export default DecimalsTextField;

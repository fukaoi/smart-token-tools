import { TextField, Box } from '@mui/material';
import SugbHeadlineTypography from '../typography/HeadlineTypography';
import DescriptionTypography from '../typography/DescriptionTypography';
import ExampleTypography from '../typography/ExampleTypography';
import { useController, UseControllerProps } from 'react-hook-form';
import { TokenFormValues } from "../../types";

const DecimalsTextField = (props: UseControllerProps<TokenFormValues>) => {
  const { field } = useController(props);
  const description = `The value of this setting specifies the number of decimal points in the token. 
     Please refer to the example below.`;
  const example = `
     0 decimals:  1000,         10000,           1
     1 decimals:  1000.0,      10000.0,     0.1
     2 decimals:  1000.00,    10000.00,   0.01
     3 decimals:  1000.000,  10000.000, 0.001
    `;
  return (
    <>
      <SugbHeadlineTypography message="Input token decimals" />
      <DescriptionTypography message={description} />
      <ExampleTypography example={example} />
      <Box sx={{ display: 'flex', mt: 2 }}>
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

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import HeadlineTypography from "~/components/typography/HeadlineTypography";
import { TokenFormValues } from "~/types";
import { useController, UseControllerProps } from "react-hook-form";

const TokenIssueTypeRadio = (props: UseControllerProps<TokenFormValues>) => {
  const { field } = useController(props);
  return (
    <>
      <HeadlineTypography message="Select token issue type" />
      <RadioGroup aria-labelledby="issueType" defaultValue="new" {...field}>
        <FormControlLabel
          value="new"
          control={<Radio color="primary" />}
          label="New"
        />
        <FormControlLabel
          value="add"
          control={<Radio color="secondary" />}
          label="Add"
        />
      </RadioGroup>
    </>
  );
};

export default TokenIssueTypeRadio;

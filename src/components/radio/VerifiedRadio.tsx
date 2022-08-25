import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import HeadlineTypography from "../typography/HeadlineTypography";
import { FormValues } from "../../pages/NftPage";
import { useController, UseControllerProps } from "react-hook-form";

const VerifiedRadio = (props: UseControllerProps<FormValues>) => {
  const { field } = useController(props);
  return (
    <>
      <HeadlineTypography message="Select Verified" />
      <RadioGroup aria-labelledby="issueType" defaultValue="True" {...field}>
        <FormControlLabel value="True" control={<Radio />} label="True" />
        <FormControlLabel value="False" control={<Radio />} label="False" />
      </RadioGroup>
    </>
  );
};

export default VerifiedRadio;

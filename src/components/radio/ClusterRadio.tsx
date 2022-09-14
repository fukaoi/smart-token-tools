import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import HeadlineTypography from "../typography/HeadlineTypography";
import { useController, UseControllerProps } from "react-hook-form";
import { FormValues } from "../../pages/TokenPage";
import { NFTFormValues } from "../../pages/NftPage";

const ClusterRadio = (props: UseControllerProps<any>) => {
  const { field } = useController(props);
  return (
    <>
      <HeadlineTypography message="Select your using network cluster" />
      <RadioGroup aria-labelledby="cluster" defaultValue="devnet" {...field}>
        <FormControlLabel
          value="mainnet-beta"
          control={<Radio color="secondary" />}
          label="Mainnet-beta"
        />
        <FormControlLabel
          value="devnet"
          control={<Radio color="warning" />}
          label="Devnet"
        />
        <FormControlLabel
          value="testnet"
          control={<Radio color="primary" />}
          label="Testnet"
        />
      </RadioGroup>
    </>
  );
};

export default ClusterRadio;

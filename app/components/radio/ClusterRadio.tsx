import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import HeadlineTypography from "~/components/typography/HeadlineTypography";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import CustomRpcTextFiled from "~/components/textField/CustomRpcTextField";
import { Path } from "@remix-run/react";
import { TokenMetadata } from "~/types";

const ClusterRadio = <T extends TokenMetadata>(
  props: UseControllerProps<T>,
) => {
  const { field } = useController(props);
  const [selectedCustomRpc, setSelectedCustomRpc] = useState(false);
  const handleClusterNetwork = (clusterName: string) => {
    if (clusterName === "custom-rpc") {
      setSelectedCustomRpc(true);
    } else {
      setSelectedCustomRpc(false);
    }
  };
  console.log(props);

  return (
    <>
      <HeadlineTypography message="Select your using network cluster" />
      <RadioGroup
        aria-labelledby="cluster"
        defaultValue={WalletAdapterNetwork.Devnet}
        {...field}
      >
        <FormControlLabel
          value={"custom-rpc"}
          control={<Radio color="warning" />}
          label="Custom RPC"
          onChange={() => handleClusterNetwork("custom-rpc")}
        />
        <CustomRpcTextFiled
          control={props.control!}
          name="symbol"
        />
        <FormControlLabel
          value={WalletAdapterNetwork.Mainnet}
          control={<Radio color="primary" />}
          label="Mainnet-beta"
          onChange={() => handleClusterNetwork("mainet")}
        />
        <FormControlLabel
          value={WalletAdapterNetwork.Devnet}
          control={<Radio color="secondary" />}
          label="Devnet"
          onChange={() => handleClusterNetwork("devnet")}
        />
      </RadioGroup>
    </>
  );
};

export default ClusterRadio;

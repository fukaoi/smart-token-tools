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

const ClusterRadio = <T extends FieldValues>(
  props: UseControllerProps<T>,
  onChange: (value: string) => {},
) => {
  const { field } = useController(props);

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
          onChange("custom-rpc")
        />
        {selectedCustomRpc && (
          <CustomRpcTextFiled
            control={props.control}
            name={props.name}
          />
        )}
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

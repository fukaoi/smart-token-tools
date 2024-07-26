import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import HeadlineTypography from "../typography/HeadlineTypography";
import { useController, UseControllerProps } from "react-hook-form";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import CustomRpcTextFiled from "../textField/CustomRpcTextField";

const ClusterRadio = (props: UseControllerProps<any>) => {
  const { field } = useController(props);
  const [selectedCustomRpc, setSelectedCustomRpc] = useState(false);
  const handleCustomRpc = (clusterName: string) => {
    if (clusterName === "custom-rpc") {
      setSelectedCustomRpc(true);
    } else {
      setSelectedCustomRpc(false);
    }
  };

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
          onChange={() => handleCustomRpc("custom-rpc")}
        />
        {selectedCustomRpc && (
          <CustomRpcTextFiled />
        )}
        <FormControlLabel
          value={WalletAdapterNetwork.Mainnet}
          control={<Radio color="primary" />}
          label="Mainnet-beta"
          onChange={() => handleCustomRpc("mainet")}
        />
        <FormControlLabel
          value={WalletAdapterNetwork.Devnet}
          control={<Radio color="secondary" />}
          label="Devnet"
          onChange={() => handleCustomRpc("devnet")}
        />
      </RadioGroup>
    </>
  );
};

export default ClusterRadio;

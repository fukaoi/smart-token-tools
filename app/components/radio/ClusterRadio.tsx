import { useState } from "react";
import HeadlineTypography from "~/components/typography/HeadlineTypography";
import { useController, UseControllerProps } from "react-hook-form";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useStorage } from "~/utils/storage";

const ClusterRadio = (props: UseControllerProps<any>) => {
  const { field, fieldState } = useController(props);
  const [storage] = useStorage("network");
  const [selectedCustomRpc, setSelectedCustomRpc] = useState(false);
  const handleClusterNetwork = (clusterName: string) => {
    if (clusterName === "custom-rpc") {
      setSelectedCustomRpc(true);
    } else {
      setSelectedCustomRpc(false);
    }
  };
  const customRpcField = useController({
    name: "customClusterUrl",
    defaultValue: storage.cluster.customClusterUrl,
    control: props.control,
    rules: { required: selectedCustomRpc },
  });

  return (
    <>
      <HeadlineTypography message="Select your using network cluster" />
      <RadioGroup aria-labelledby="cluster" {...field}>
        <FormControlLabel
          value={"custom-rpc"}
          control={<Radio color="warning" />}
          label="Custom RPC"
          onChange={() => handleClusterNetwork("custom-rpc")}
        />
        {selectedCustomRpc && (
          <Box sx={{ display: "flex", mb: 2 }}>
            <TextField
              type="text"
              id="outlined-basic"
              label="Custom rpc url"
              placeholder="https://..."
              variant="outlined"
              size="small"
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              {...customRpcField.field}
            />
          </Box>
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

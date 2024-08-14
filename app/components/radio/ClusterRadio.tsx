import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import HeadlineTypography from "~/components/typography/HeadlineTypography";
import { useController, UseControllerProps } from "react-hook-form";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { TokenMetadata } from "~/types";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";

const ClusterRadio = <T extends TokenMetadata>(
  props: UseControllerProps<T>,
) => {
  const { field, fieldState } = useController(props);
  const [selectedCustomRpc, setSelectedCustomRpc] = useState(false);
  const handleClusterNetwork = (clusterName: string) => {
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
              name="customClusterUrl"
              // error={fieldState.invalid}
              // helperText={fieldState.error?.message}
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

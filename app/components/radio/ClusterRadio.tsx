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
  Checkbox,
  Typography,
} from "@mui/material";
import { useStorage } from "~/utils/storage";

const ClusterRadio = (props: UseControllerProps<any>) => {
  const { field, fieldState } = useController(props);
  const [storage] = useStorage("network");
  const [selectedCustomRpc, setSelectedCustomRpc] = useState(false);
  const handleClusterNetwork = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCustomRpc(event.target.checked);
  };
  const customRpcField = useController({
    name: "customClusterUrl",
    defaultValue: storage.cluster.customClusterUrl,
    control: props.control,
    rules: { required: selectedCustomRpc },
  });
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <>
      <HeadlineTypography message="Select your using network cluster" />
      <RadioGroup aria-labelledby="cluster" {...field}>
        <FormControlLabel
          value={WalletAdapterNetwork.Mainnet}
          control={<Radio color="primary" />}
          label="Mainnet-beta"
        />
        <FormControlLabel
          value={WalletAdapterNetwork.Devnet}
          control={<Radio color="secondary" />}
          label="Devnet"
        />
        <FormControlLabel
          control={<Checkbox onChange={handleClusterNetwork} />}
          label={
            <Typography sx={{ fontSize: "15px" }}>Custom RPC URL</Typography>
          }
        />
      </RadioGroup>
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
    </>
  );
};

export default ClusterRadio;

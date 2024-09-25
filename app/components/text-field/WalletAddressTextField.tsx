import { Box, TextField } from "@mui/material";
import type { NFTMetadata } from "~/types";
import { useController, type UseControllerProps } from "react-hook-form";

const WalletAddressTextField = (props: UseControllerProps<NFTMetadata>) => {
  const { field } = useController(props);
  return (
    <>
      <Box sx={{ display: "flex", mt: 2 }}>
        <TextField
          type="text"
          minRows={100}
          id="outlined-basic"
          label="Wallet Address"
          placeholder="Input Wallet Address"
          variant="outlined"
          size="small"
          error={false}
          {...field}
          style={{ width: 480 }}
        />
      </Box>
    </>
  );
};

export default WalletAddressTextField;

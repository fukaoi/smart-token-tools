import { TextField, Box } from "@mui/material";
import HeadlineTypography from "../typography/HeadlineTypography";
import { NFTFormValues } from "../../pages/NftPage";
import { useController, UseControllerProps } from "react-hook-form";

const NftNameTextField = (props: UseControllerProps<NFTFormValues>) => {
  const { field } = useController(props);
  return (
    <>
      <HeadlineTypography message="Input NFT Name" />
      <Box sx={{ display: "flex", mt: 2 }}>
        <TextField
          type="text"
          id="outlined-basic"
          label="input nft name"
          placeholder="NFT NAME..."
          variant="outlined"
          size="small"
          required
          error={false}
          {...field}
        />
      </Box>
    </>
  );
};

export default NftNameTextField;

import { TextField, Box } from "@mui/material";
import HeadlineTypography from "../typography/HeadlineTypography";
import { NFTFormValues } from "../../pages/NftPage";
import { useController, UseControllerProps } from "react-hook-form";

const RoyaltyTextField = (props: UseControllerProps<NFTFormValues>) => {
  const { field } = useController(props);
  return (
    <>
      <HeadlineTypography message="Input Royalty" />
      <Box sx={{ display: "flex", mt: 2 }}>
        <TextField
          type="text"
          minRows={100}
          id="outlined-basic"
          label="royalty"
          placeholder="1, 2, 3,,,"
          variant="outlined"
          size="small"
          error={false}
          {...field}
        />
      </Box>
    </>
  );
};

export default RoyaltyTextField;

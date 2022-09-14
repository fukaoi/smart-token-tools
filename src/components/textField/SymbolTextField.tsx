import { TextField, Box } from "@mui/material";
import HeadlineTypography from "../typography/HeadlineTypography";
import { NFTFormValues } from "../../pages/NftPage";
import { useController, UseControllerProps } from "react-hook-form";

const SymbolTextField = (props: UseControllerProps<NFTFormValues>) => {
  const { field } = useController(props);
  return (
    <>
      <HeadlineTypography message="Input Symbol" />
      <Box sx={{ display: "flex", mt: 2 }}>
        <TextField
          type="text"
          id="outlined-basic"
          label="input symbol"
          placeholder="SYMBOL"
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

export default SymbolTextField;

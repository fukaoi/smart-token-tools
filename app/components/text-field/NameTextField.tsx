import { Box, TextField } from "@mui/material";
import HeadlineTypography from "~/components/typography/HeadlineTypography";
import {
  type FieldValues,
  useController,
  type UseControllerProps,
} from "react-hook-form";

const setTitle = (name: string) =>
  name == "nftName" ? "Input NFT name" : "Input Token name";

const NameTextField = <T extends FieldValues>(props: UseControllerProps<T>) => {
  const { field, fieldState } = useController(props);
  return (
    <>
      <HeadlineTypography message={setTitle(field.name)} />
      <Box sx={{ display: "flex", mt: 2 }}>
        <TextField
          type="text"
          id="outlined-basic"
          label={setTitle(field.name)}
          placeholder="original name..."
          variant="outlined"
          size="small"
          error={fieldState.invalid}
          helperText={fieldState.error?.message}
          {...field}
        />
      </Box>
    </>
  );
};

export default NameTextField;

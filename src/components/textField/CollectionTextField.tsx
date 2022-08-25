import { TextField, Box } from "@mui/material";
import HeadlineTypography from "../typography/HeadlineTypography";
import { FormValues } from "../../pages/NftPage";
import { useController, UseControllerProps } from "react-hook-form";

const CollectionTextField = (props: UseControllerProps<FormValues>) => {
  const { field } = useController(props);
  return (
    <>
      <HeadlineTypography message="Collection" />
      <Box sx={{ display: "flex", mt: 2 }}>
        <TextField
          type="text"
          minRows={100}
          id="filled-basic"
          label="Collection"
          placeholder="ATONOy"
          variant="filled"
          size="small"
          error={false}
          {...field}
          inputProps={{
            readOnly: true,
          }}
        />
      </Box>
    </>
  );
};

export default CollectionTextField;

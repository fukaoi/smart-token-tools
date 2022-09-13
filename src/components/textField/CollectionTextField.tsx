import { TextField, Box } from "@mui/material";
import HeadlineTypography from "../typography/HeadlineTypography";
import { NFTFormValues } from "../../pages/NftPage";
import { useController, UseControllerProps } from "react-hook-form";

const CollectionTextField = (props: UseControllerProps<NFTFormValues>) => {
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
          placeholder="Powered by ATONOY Co, Ltd"
          variant="filled"
          size="small"
          error={false}
          {...field}
          inputProps={{
            readOnly: true,
          }}
          style={{ width: 250 }}
        />
      </Box>
    </>
  );
};

export default CollectionTextField;

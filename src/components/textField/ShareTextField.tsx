import { TextField, Box } from "@mui/material";
import { FormValues } from "../../pages/NftPage";
import { useController, UseControllerProps } from "react-hook-form";
import DescriptionTypography from "../typography/DescriptionTypography";

const ShareTextField = (props: UseControllerProps<FormValues>) => {
  const { field } = useController(props);
  const description = `
  Set Share. What percentage of royalties to get
  `;

  return (
    <>
      <DescriptionTypography message={description} />
      <Box sx={{ display: "flex", mt: 2 }}>
        <TextField
          type="text"
          minRows={100}
          id="outlined-basic"
          label="Share"
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

export default ShareTextField;

import type { FC } from "react";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { theme } from "~/utils/colorTheme";

const AddressTypography: FC<{ address: string }> = ({ address }) => {
  return (
    <Box
      component="div"
      sx={{
        background: theme.palette.purpleGuradation.main,
        borderRadius: 1,
        color: "white",
        padding: "5px",
        marginBottom: "15px",
      }}
    >
      <Typography component="div" fontSize="16px">
        {" "}
        current your address:
      </Typography>
      <Typography component="div" fontSize="16px">
        {address}
      </Typography>
    </Box>
  );
};

export default AddressTypography;

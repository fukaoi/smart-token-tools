import { FC } from "react";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { theme } from "~/utils/colorTheme";
import { AlertTitle, Alert } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const UsageTypography: FC<{ message: string }> = ({ message }) => {
  return (
    <Box
      component="div"
      sx={{
        textAlign: "left",
        marginTop: "15px",
        marginBottom: "15px",
        marginLeft: "10px",
      }}
    >
      <Alert
        iconMapping={{
          success: <InfoOutlinedIcon fontSize="inherit" color="info" />,
        }}
        color="info"
        style={{
          fontSize: "15px",
        }}
      >
        {message}
      </Alert>
    </Box>
  );
};

export default UsageTypography;

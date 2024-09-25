import type { FC } from "react";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { AlertTitle, Alert } from "@mui/material";
import { theme } from "~/utils/colorTheme";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
const DescriptionTypography: FC<{ message: string }> = ({ message }) => {
  return (
    <Box
      component="div"
      sx={{
        textAlign: "left",
        marginTop: "15px",
        marginBottom: "30px",
        marginLeft: "10px",
      }}
    >
      <Alert
        icon={false}
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

export default DescriptionTypography;

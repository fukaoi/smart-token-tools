import type { FC } from "react";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { AlertTitle, Alert } from "@mui/material";
import { theme } from "~/utils/colorTheme";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
const ProcessingTypography: FC<{ message: string }> = ({ message }) => {
  return (
    <Typography component="div" marginLeft={"15px"} fontSize={"25px"}>
      {message}
    </Typography>
  );
};

export default ProcessingTypography;

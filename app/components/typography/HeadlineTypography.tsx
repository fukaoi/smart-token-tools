import Typography from "@mui/material/Typography";
import type { FC } from "react";
import { theme } from "~/utils/colorTheme";

const HeadlineTypography: FC<{ message: string }> = ({ message }) => {
  return (
    <Typography
      align="left"
      variant="h6"
      sx={{
        padding: "3px 15px",
        borderLeft: theme.palette.headLineBorder.main,
        background: theme.palette.headLineBackground.main,
        marginBottom: "1.5",
      }}
    >
      {message}
    </Typography>
  );
};

export default HeadlineTypography;

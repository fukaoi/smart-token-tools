import { FC } from "react";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { theme } from "~/utils/colorTheme";

const DescriptionTypography: FC<{ message: string }> = ({ message }) => {
  return (
    <Box
      component="div"
      sx={{
        background: "#cdeaf9",
        borderRadius: 1,
        color: "white",
        padding: "15px",
        marginBottom: "1em",
      }}
    >
      <Typography component="div" fontSize="16px">
        {message}
      </Typography>
    </Box>
  );
};

export default DescriptionTypography;

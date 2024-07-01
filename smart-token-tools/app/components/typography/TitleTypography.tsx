import { FC } from "react";
import Typography from "@mui/material/Typography";

const TitleTypography: FC<{ title: string }> = ({ title }) => {
  return (
    <Typography component="div" fontSize="1.8em" fontWeight="bold">
      {title}
    </Typography>
  );
};

export default TitleTypography;

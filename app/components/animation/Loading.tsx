import type { FC } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import ProcessingTypography from "../typography/ProcessingTypography";

type LoadingProps = {
  isLoading: boolean;
  message?: string;
};

const Loading: FC<LoadingProps> = ({ isLoading, message }) => {
  return isLoading ? (
    <Backdrop open={isLoading}>
      <CircularProgress color="info" />
      {message && <ProcessingTypography message={message} />}
    </Backdrop>
  ) : null;
};
export default Loading;

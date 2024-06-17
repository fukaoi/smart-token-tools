import { FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

type LoadingProps = {
  isLoading: boolean;
};

const Loading: FC<LoadingProps> = ({ isLoading }) => {
  return isLoading ? (
    <Backdrop open={isLoading}>
      <CircularProgress color="info" />
    </Backdrop>
  ) : null;
};
export default Loading;

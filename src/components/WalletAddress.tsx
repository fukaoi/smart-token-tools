import {FC} from 'react';
import Typography from '@mui/material/Typography';

const WalletAddress: FC<{address: string}> = ({address}) => {
  return (
    <div>
      <Typography
        component='div'
        fontSize='20px'
      > Your address:
      </Typography>
      <Typography
        component='div'
        fontSize='25px'
        sx={{mb: 4}}
      >{address}
      </Typography>
    </div>
  );
}

export default WalletAddress;

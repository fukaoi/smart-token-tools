import { FC } from 'react';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { theme } from '~/utils/colorTheme';

const styles = {
  box: {
    background: theme.palette.orangeGuradation.main,
    borderRadius: 1,
    color: 'white',
    padding: '5px',
    marginBottom: '1em',
  },
};

const AddressTypography: FC<{ address: string }> = ({ address }) => {
  return (
    <Box component="div" sx={styles.box}>
      <Typography component="div" fontSize="16px">
        {' '}
        current your address:
      </Typography>
      <Typography component="div" fontSize="16px">
        {address}
      </Typography>
    </Box>
  );
};

export default AddressTypography;

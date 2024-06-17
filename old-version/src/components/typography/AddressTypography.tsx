import { FC } from 'react';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { theme } from '../../shared/colorTheme';

const styles = {
  box: {
    background: theme.palette.orangeGuradation.main,
    borderRadius: 3,
    color: 'white',
    padding: '5px',
    marginBottom: '1em',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
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

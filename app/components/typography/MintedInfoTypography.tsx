import { FC } from 'react';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { theme } from '~/utils/colorTheme';

const styles = {
  box: {
    background: theme.palette.primary.main,
    borderRadius: 3,
    color: theme.palette.common.white,
    padding: '5px',
    marginBottom: '1em',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
};

const MintedInfoTypography: FC<{ message: string }> = ({ message }) => {
  return (
    <Box component="div" sx={styles.box}>
      <Typography component="div" fontSize="16px">
        {' '}
        Your mint:
      </Typography>
      <Typography component="div" fontSize="16px">
        {message}
      </Typography>
    </Box>
  );
};

export default MintedInfoTypography;

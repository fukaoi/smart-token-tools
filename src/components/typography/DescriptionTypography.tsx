import { FC } from 'react';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { theme } from '../../shared/colorTheme';

const styles = {
  box: {
    textAlign: 'left',
    marginTop: '1em',
    marginBottom: '1em',
    marginLeft: '10px',
  },
};

const DescriptionTypography: FC<{ message: string }> = ({ message }) => {
  return (
    <Box component="div" sx={styles.box}>
      <Typography
        component="div"
        fontSize="15px"
        color={theme.palette.textBlack.light}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default DescriptionTypography;

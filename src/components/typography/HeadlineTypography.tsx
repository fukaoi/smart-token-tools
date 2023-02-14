import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { theme } from '../../shared/colorTheme';

const styles = {
  headline: {
    padding: '3px 15px',
    borderLeft: theme.palette.headLineBorder.main,
    background: theme.palette.headLineBackground.main,
    marginBottom: '1.5',
  },
};

const HeadlineTypography: FC<{ message: string }> = ({ message }) => {
  return (
    <Typography align="left" variant="h6" sx={styles.headline}>
      {message}
    </Typography>
  );
};

export default HeadlineTypography;

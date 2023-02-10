import Typography from '@mui/material/Typography';
import { FC } from 'react';

const styles = {
  headline: {
    padding: '3px 15px',
    borderLeft: '3px solid #777777',
    background: '#f1f1f1',
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

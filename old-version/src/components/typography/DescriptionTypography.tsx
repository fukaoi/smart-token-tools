import { FC } from 'react';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { theme } from '../../shared/colorTheme';
import { AlertTitle, Alert } from '@mui/material';

const styles = {
  box: {
    textAlign: 'left',
    marginTop: '1em',
    marginBottom: '1em',
    marginLeft: '10px',
  },
  title: {
    fontSize: '80%',
    paddingTop: '0.4em',
    marginBottom: '1em',
  },
};

const DescriptionTypography: FC<{ message: string }> = ({ message }) => {
  return (
    <Box component="div" sx={styles.box}>
      <Alert severity="info">
        <AlertTitle style={styles.title}>Usage information</AlertTitle>
        <Typography
          component="div"
          fontSize="15px"
          color={theme.palette.textBlack.light}
        >
          {message}
        </Typography>
      </Alert>
    </Box>
  );
};

export default DescriptionTypography;

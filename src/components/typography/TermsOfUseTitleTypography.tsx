import {FC} from 'react';
import {Box} from '@mui/system';
import Typography from '@mui/material/Typography';
import {theme} from '../../shared/colorTheme';

const styles = {
  box: {
    textAlign: 'left',
  },
};

const TermOfUseTitileTypography: FC<{message: string}> = ({message}) => {
  return (
    <Box component="div" sx={styles.box}>
      <Typography
        component='div'
        fontSize='25px'
        color={theme.palette.textBlack.light}
      >{message}
      </Typography>
    </Box>
  );
}

export default TermOfUseTitileTypography;

import { FC } from 'react';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { theme } from '../../shared/colorTheme';
import UploadFileTwoToneIcon from '@mui/icons-material/UploadFileTwoTone';

const styles = {
  box: {
    textAlign: 'left',
    marginTop: '1em',
    marginLeft: '10px',
    width: '200px',
  },
};

const UploadedFileTypography: FC<{ fileName: string }> = ({ fileName }) => {
  return (
    <Box component="div" sx={styles.box}>
      <div>
        <Typography
          component="div"
          fontSize="20px"
          color={theme.palette.textBlack.light}
        >
          <UploadFileTwoToneIcon fontSize="small" />
          {fileName}
        </Typography>
      </div>
    </Box>
  );
};

export default UploadedFileTypography;

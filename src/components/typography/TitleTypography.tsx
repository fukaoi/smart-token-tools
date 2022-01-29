import {FC} from 'react';
import Typography from '@mui/material/Typography';

const TitleTypography: FC<{title: string}> = ({title}) => {
  return (
      <Typography
        component='div'
        fontSize='1.8em'
        fontWeight='bold'
        sx={{mt: 5}}
      >{title}
      </Typography>
  );
}

export default TitleTypography;

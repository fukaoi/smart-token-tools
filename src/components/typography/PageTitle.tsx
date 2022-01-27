import {FC} from 'react';
import Typography from '@mui/material/Typography';

const PageTitle: FC<{title: string}> = ({title}) => {
  return (
      <Typography
        component='div'
        fontStyle='italic'
        fontSize='2em'
        sx={{mt: 5}}
      >{title}
      </Typography>
  );
}

export default PageTitle;

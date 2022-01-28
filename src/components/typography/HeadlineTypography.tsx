import {makeStyles} from '@mui/styles';
import Typography from '@mui/material/Typography';
import {FC} from 'react';

const useStyles = makeStyles({
  headline: {
    padding: '3px 15px',
    borderLeft: '3px solid #aaaaaa',
    background: '#f4f4f4',
  },
});

const HeadlineTypography:FC<{message: string}> = ({message}) => {
  const styles = useStyles();
  return ( 
  <Typography 
    align='left' 
    variant='h6' 
    className={styles.headline}
    sx={{mb:1.5}}
  >{message}
  </Typography>
  );
};

export default HeadlineTypography;

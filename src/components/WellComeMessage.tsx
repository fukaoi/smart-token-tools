import {Typography} from '@mui/material';
import {makeStyles} from '@mui/styles';
import TitleTypography from './typography/TitleTypography';

const useStyles = makeStyles({
  message: {
    position: 'relative',
    top: '10px',
    marginBottom: '1em',
  },
});

const WellComeMessage = () => {
  const styles = useStyles();
  return (
    <div className={styles.message}>
      <Typography
        component='div'
        fontSize='23px'
        fontWeight='500'
      >LETS TOKEN ISSUE EASY AND QUICKLY
      </Typography>
      <Typography
        component='div'
        fontSize='3em'
        fontWeight='bold'
      >TOKEN AND NFT
      </Typography>
    </div>
  );
}

export default WellComeMessage;

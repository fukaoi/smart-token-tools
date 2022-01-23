import {makeStyles} from '@mui/styles';
import titleLogo from '../assets/title-logo.png';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
  message: {
    position: 'relative',
    top: '3em',
    marginBottom: '1em',
  },
});

const WellComeMessage = () => {
  const styles = useStyles();
  return (
    <div className={styles.message}>
      <Typography
        variant='h3'
        component='div'
        fontStyle='italic'
      >Welcome ♥
      </Typography>
      <img src={titleLogo} alt='smart token tool' />
    </div>
  );
}

export default WellComeMessage;

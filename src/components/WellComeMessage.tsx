import {makeStyles} from '@mui/styles';
import titleLogo from '../assets/title-logo.png';

const useStyles = makeStyles({
  message: {
    position: 'relative',
    top: '3em',
    marginBottom: '1em',
  },
  wellCome: {
    fontSize: '1.7em',
    marginBottom: '0.2em',
    fontStyle: 'italic',
  },
  title: {
    fontSize: '3em',
  },
});

const WellComeMessage = () => {
  const styles = useStyles();
  return (
    <div className={styles.message}>
      <div className={styles.wellCome}>Well Come ♥</div>
      <img src={titleLogo} />
    </div>
  );
}

export default WellComeMessage;

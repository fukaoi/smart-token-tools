import {makeStyles} from '@mui/styles';

import titleLogo from '../assets/title-logo.png';

const useStyles = makeStyles({
  message: {
    marginBottom: '15em',
  },
  wellCome: {
    fontSize: '1.8em',
    fontWeight: 'bolder',
    marginBottom: '0.2em'
  },
  title: {
    fontSize: '3em',
  }
});

const WellComeMessage = () => {
  const styles = useStyles();
  return (
    <div className={styles.message}>
      <div className={styles.wellCome}>Well Come</div>
      <img src={titleLogo} />
    </div>
  );
}


export default WellComeMessage;

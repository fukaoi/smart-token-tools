import {makeStyles} from '@mui/styles';
import titleLogo from '../assets/title-logo.png';
import TitleTypography from './typography/TitleTypography';

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
      <TitleTypography title='Welcome ♥' />
      <img src={titleLogo} alt='smart token tool' />
    </div>
  );
}

export default WellComeMessage;

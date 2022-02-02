import UsageGuide from '../components/UsageGuide';
import SubmitButton from '../components/button/SubmitButton';
import {makeStyles} from '@mui/styles';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';
import {SiteContext} from '../App';
import {useContext} from 'react';

declare global {interface Window {solana: any}}

const useStyles = makeStyles({
  message: {
    position: 'relative',
    top: '3em',
    marginBottom: '1em',
  },
  submit: {
    width: '100%',
    marginTop: '8em',
    marginBottom: '1em',
  }
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
        fontSize='2.4em'
        fontWeight='bold'
      >TOKEN AND NFT
      </Typography>
    </div>
  );
}

const TopPage = () => {
  const context = useContext(SiteContext);
  const styles = useStyles();
  const navigate = useNavigate();
  const connectHandler = () => {
    window.solana.connect().then(() => {
      if (!context.isWalletConnected) {
        // error modal
        navigate('/');
      } else {
        navigate('/token');
      }
    });
  };

  return (
    <div>
      <WellComeMessage />
      <UsageGuide />
      <div className={styles.submit}>
        <SubmitButton
          title='Getting start'
          callbackFunc={connectHandler}
        />
      </div>
    </div>
  );
};
export default TopPage;

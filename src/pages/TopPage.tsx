import UsageGuide from '../components/UsageGuide';
import SubmitButton from '../components/button/SubmitButton';
import {makeStyles} from '@mui/styles';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';

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
  const styles = useStyles();
  const [btnState, setBtnState] = useState(
    {
      title: 'Getting start', 
      isDisabled: false
    }
  );
  const navigate = useNavigate();

  const connectHandler = () => {
    setBtnState({title: 'Processing', isDisabled: true});
    window.solana.connect().then(() => {
      navigate('/token');
    });
  };

  return (
    <>
      <WellComeMessage />
      <UsageGuide />
      <div className={styles.submit}>
        <SubmitButton
          isDisabled={btnState.isDisabled}
          title={btnState.title}
          callbackFunc={connectHandler}
        />
      </div>
    </>
  );
};
export default TopPage;

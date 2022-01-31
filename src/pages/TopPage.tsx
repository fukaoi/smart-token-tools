import {useEffect, useState} from 'react';
import UsageGuide from '../components/UsageGuide';
import SubmitButton from '../components/button/SubmitButton';
import {makeStyles} from '@mui/styles';
import Typography from '@mui/material/Typography';
import TokenPage from './TokenPage';

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
  const [isConnect, setConnected] = useState(false);// eslint-disable-line

  useEffect(() => {
    window.solana.on('connect', () => {
      console.log('connected');
      setConnected(true);
    });

    window.solana.on('disconnect', () => {
      console.log('disconnected');
      setConnected(false);
    });
  }, []);

  const connectHandler = () => {
    window.solana.connect().then((conn: any) => {
      console.log(conn.publicKey.toString());
    });
  };

  const Route = () => {
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
  }
  return isConnect ? <TokenPage /> : <Route />;
};
export default TopPage;

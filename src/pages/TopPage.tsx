import {FC, useEffect, useState} from 'react';
import UsageGuide from '../components/UsageGuide';
import SubmitButton from '../components/button/SubmitButton';
import {makeStyles} from '@mui/styles';
import Typography from '@mui/material/Typography';
import {Box} from '@mui/material';

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

const TopPage: FC<{callbackFunc: () => void}> = ({callbackFunc}) => {
  const styles = useStyles();
  const [_, setConnected] = useState(false);// eslint-disable-line

  useEffect(() => {
    window.solana.on('connect', () => {
      console.log('connected');
      setConnected(true);
      callbackFunc();
    });

    window.solana.on('disconnect', () => {
      console.log('disconnected');
      setConnected(false);
    });
  }, [callbackFunc]);

  const connectHandler = () => {
    window.solana.connect().then((conn: any) => {
      console.log(conn.publicKey.toString());
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

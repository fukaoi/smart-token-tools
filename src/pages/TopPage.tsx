import {FC, useEffect, useState} from 'react';
import WellComeMessage from '../components/WellComeMessage';
import UsageGuide from '../components/UsageGuide';
import SubmitButton from '../components/button/SubmitButton';
import {Box} from '@mui/material';

declare global {interface Window {solana: any}}

const TopPage: FC<{callbackFunc: () => void}> = ({callbackFunc}) => {

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
      <Box sx={{mt: 20}} />
      <SubmitButton title='Getting start' callbackFunc={connectHandler} />
    </div>
  );
};
export default TopPage;

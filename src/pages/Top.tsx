import {FC, useEffect, useState} from 'react';
import {withStyles} from '@mui/styles';
import Button from '@mui/material/Button';
import WellComeMessage from '../components/WellComeMessage';
import UsageGuide from '../components/UsageGuide';

const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    width: '250px',
    height: '50px',
    position: 'relative',
    top: '22em',
    marginBottom: '1em',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

declare global {interface Window {solana: any}}

const Top: FC<{parentFunc: () => void}> = ({parentFunc}) => {
  const [_, setConnected] = useState(false);

  useEffect(() => {
    window.solana.on('connect', () => {
      console.log('connected');
      setConnected(true);
      // set cookie
      parentFunc();
    });

    window.solana.on('disconnect', () => {
      console.log('disconnected');
      // delete cookie
      setConnected(false);
    });
  }, []);

  const connectHandler = () => {
    window.solana.connect().then((conn: any) => {
      console.log(conn.publicKey.toString());
    });
  };

  return (
    <div>
      <WellComeMessage />
      <UsageGuide />
      <StyledButton
        variant='contained'
        onClick={() => connectHandler()}
      >
        Getting Start
      </StyledButton>
    </div>
  );
};
export default Top;

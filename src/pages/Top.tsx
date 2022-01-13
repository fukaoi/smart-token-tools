import {FC} from 'react';
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

declare global { interface Window { solana: any } } 

const checkPhantomWallet = () => {
  window.solana.connect();
}

const Top: FC<{parentFunc: () => void}> = ({parentFunc}) => {
  return (
    <div>
      <WellComeMessage />
      <UsageGuide />
      <StyledButton
        variant='contained'
        // onClick={parentFunc}
        onClick={() => checkPhantomWallet()}
      >
        Getting Start 
      </StyledButton>
    </div>
  );
};
export default Top;

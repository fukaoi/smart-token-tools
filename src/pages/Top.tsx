import {FC} from 'react';
import {makeStyles, withStyles} from '@mui/styles';
import Button from '@mui/material/Button';
import WellComeMessage from '../components/WellComeMessage';
import UsageGuide from '../components/UsageGuide';

const useStyles = makeStyles({
  button: {
    maxWidth: '250px',
    minidth: '250px',
    maxHeight: '50px',
    minHeight: '50px',
    position: 'relative',
    top: '22em',
    marginBottom: '1em',
  },
});

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

const Top: FC<{parentFunc: () => void}> = ({parentFunc}) => {
  return (
    <div>
      <WellComeMessage />
      <UsageGuide />
      <StyledButton
        variant='contained'
        onClick={parentFunc}
      >
        Getting Start 
      </StyledButton>
    </div>
  );
};
export default Top;

import {FC} from 'react';
import {withStyles} from '@mui/styles';
import Button from '@mui/material/Button';

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
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);


const SubmitButton: FC<{callbackFunc: () => void, title: string}> = ({callbackFunc, title}) => {
  return (
    <StyledButton
      variant='contained'
      onClick={callbackFunc}
    >{title}
    </StyledButton>
  );
};
export default SubmitButton;

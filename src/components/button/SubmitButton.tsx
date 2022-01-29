import {FC} from 'react';
import {withStyles} from '@mui/styles';
import Button from '@mui/material/Button';

const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    color: 'white',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    width: '200px',
    height: '40px',
    position: 'relative',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);


const SubmitButton: FC<
  {
    className?: any,
    callbackFunc: (event?: any) => void,
    title: string
  }
> = ({className, callbackFunc, title}) => {
  return (
    <StyledButton
      type='submit'
      variant='contained'
      onClick={callbackFunc}
      style={{fontWeight: '550', fontSize: '15px'}}
      className={className}
    >{title}
    </StyledButton>
  );
};
export default SubmitButton;

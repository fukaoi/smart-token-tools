import {FC} from 'react';
import {makeStyles} from '@mui/styles';
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
    top: '20em',
    marginBottom: '1em',
  },
});

const Top: FC<{parentFunc: () => void}> = ({parentFunc}) => {
  const styles = useStyles();
  return (
    <div>
      <WellComeMessage />
      <UsageGuide />
      <Button
        variant='contained'
        size='large'
        color='secondary'
        className={styles.button}
        onClick={parentFunc}
      >Create start
      </Button>

    </div>
  );
};
export default Top;

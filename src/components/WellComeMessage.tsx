import {Typography} from '@mui/material';
import {makeStyles} from '@mui/styles';
import TitleTypography from './typography/TitleTypography';

const useStyles = makeStyles({
  message: {
    position: 'relative',
    top: '1em',
    marginBottom: '1em',
  },
});

const WellComeMessage = () => {
  const styles = useStyles();
  return (
    <div className={styles.message}>
      <TitleTypography title='Welcome ♥' />
      <Typography
        component='div'
        fontSize='2em'
        fontWeight='bold'
      >Let's issue token/NFT<br />very quickly and easily</Typography>
    </div>
  );
}

export default WellComeMessage;

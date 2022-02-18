import {useEffect} from 'react';
import TitleTypography from "../components/typography/TitleTypography";
import {makeStyles} from '@mui/styles';
import CompleteBackground from '../assets/complete-background.png';
import MintedInfoTypography from "../components/typography/MintedInfoTypography";
import {Paper} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {theme} from '../shared/colorTheme';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  cardMedia: {
    width: '100%',
    textAlign: 'center',
  },
  cardContainer: {
    position: 'relative',
    marginTop: '1em',
    minWidth: '800px',
    maxWidth: '800px',
    maxHeight: 'auto',
    marginLeft: '4em',
    marginRight: '4em'
  },
  cardAction: {
    justifyContent: 'center'
  },
  root: {
    marginTop: '1em',
    minWidth: '20em',
    maxWidth: '20em',
    padding: '20px',
  },
});


const CompletePage = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  // useEffect(() => {
  // if (window.solana) {
  // console.log('icConnected', window.solana.isConnected);
  // !window.solana.isConnected && navigate('/');
  // }
  // });

  return (
    <>
      <TitleTypography title='Complete' />
      <div className={styles.container}>
        <Paper className={styles.root}>
          <img src={CompleteBackground} className={styles.cardMedia} />
          <Typography
            component='div'
            fontSize='26px'
            sx={{mt: 1, mb: 3}}
          >Your token issuing was success!!
          </Typography>
          <MintedInfoTypography message='Minted token info' />
          <Typography
            component='div'
            fontSize='16px'
            sx={{m: 5, p: 5}}
          >HeH2PRj4GEdLCsbKQ18LvwhbuH4anmPQ3HoeRsJmymVw
          </Typography>
          <Button size='large'>See your token info at Explorer</Button>
        </Paper>
      </div>
    </>
  );
};
export default CompletePage;

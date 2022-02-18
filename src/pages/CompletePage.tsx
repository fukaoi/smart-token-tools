import TitleTypography from "../components/typography/TitleTypography";
import {makeStyles} from '@mui/styles';
import CompleteBackground from '../assets/complete-background.png';
import MintedInfoTypography from "../components/typography/MintedInfoTypography";
import {Paper, Link} from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useLocation} from 'react-router-dom';

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
  const {state} = useLocation();
  const tokenId = (state as {tokenId: string}).tokenId;

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
          <img alt="complete" src={CompleteBackground} className={styles.cardMedia} />
          <Typography
            component='div'
            fontSize='26px'
            sx={{mt: 1, mb: 3}}
          >Your token issuing was success!!
          </Typography>
          <MintedInfoTypography message={tokenId} />
          <Link href={tokenId.toExplorerUrl()}>
            <Button size='large'>See your token info at Explorer</Button>
          </Link>
        </Paper>
      </div>
    </>
  );
};
export default CompletePage;

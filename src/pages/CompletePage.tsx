import TitleTypography from '../components/typography/TitleTypography';
import CompleteBackground from '../assets/complete-background.png';
import MintedInfoTypography from '../components/typography/MintedInfoTypography';
import {Paper, Link, Box} from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useLocation} from 'react-router-dom';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
  },
  cardMedia: {
    width: '100%',
    textAlign: 'center' as const,
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
  link: {
    textDecoration: 'none',
  }
};

const CompletePage = () => {
  const {state} = useLocation() as NavigateOptions;
  const mint = state.tokenId as string;
  return (
    <>
      <TitleTypography title='Complete' />
      <Box style={styles.container}>
        <Paper sx={styles.root}>
          <img alt="complete" src={CompleteBackground} style={styles.cardMedia} />
          <Typography
            component='div'
            fontSize='26px'
            sx={{mt: 1, mb: 3}}
          >Your token issuing was success!!
          </Typography>
          <MintedInfoTypography message={mint} />
          <Link sx={styles.link} href={mint.toExplorerUrl()}>
            <Button size='large'>See your token info at Explorer</Button>
          </Link>
        </Paper>
      </Box>
    </>
  );
};
export default CompletePage;

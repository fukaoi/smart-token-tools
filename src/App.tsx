import {makeStyles} from '@mui/styles';
import TokenPage from './pages/TokenPage';
import TopPage from './pages/TopPage';
import backImage from './assets/background-image.jpg';
import SubmitButton from './components/button/SubmitButton';
import corpLogoImage from './assets/atonoy-logo.png';
import logoImage from './assets/smt-logo.svg';
import {Grid} from '@mui/material';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import NftPage from './pages/NftPage';
import CompletePage from './pages/CompletePage';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    textAlign: 'center',
    backgroundSize: 'cover',
    backgroundImage: `url(${backImage})`,
    backgroundPosition: 'ceter',
    minHeight: '100vh',
    maxHeight: '200vh',
    width: '100%',
    alignItems: 'ceter',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  },
  footer: {
    fontSize: '18px',
    position: 'absolute',
    bottom: '10px',
    width: '100%',
  },
  corpLogoImage: {
    width: '120px',
  },
  navi: {
    paddingLeft: '3%',
    paddingRight: '3%',
  },
  naviLink: {
    letterSpacing: '3px',
    fontSize: '20px',
    display: 'inline-block',
    marginLeft: '20px',
    marginRight: '20px',
  },
  link: {
    textDecoration: 'none',
    color: 'white',
  },
  grid: {
    height: '10vh',
  }
});

const App = () => {
  const styles = useStyles();

  const connectHandler = () => {
    window.solana.connect().then((conn: any) => {
      console.log(conn);
    });
  };

  return (
    <Router>
      <main className={styles.root}>
        <div className={styles.navi}>
          <Grid container
            alignItems='center'
            justifyContent='center'
            className={styles.grid}
          >
            <Grid item xs={3}>
              <a href='/'><img src={logoImage} /></a>
            </Grid>
            <Grid item xs={6}>
              <div className={styles.naviLink}>
                <Link to='/token' className={styles.link}>Token</Link>
              </div>
              <div className={styles.naviLink}>
                <Link to='/nft' className={styles.link}>NFT</Link>
              </div>
              <div className={styles.naviLink}>
                <a href='https://twitter.com/messages/compose?recipient_id='
                  className={styles.link}
                  target='_blank'
                  rel='noreferrer'
                >
                  Contact
                </a>
              </div>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={2}>
              <SubmitButton
                isDisabled={false}
                callbackFunc={connectHandler}
                title='Connect wallet'
              />
            </Grid>
          </Grid>
          <Routes>
            <Route path='/' element={<TopPage />} />
            <Route path='/token' element={<TokenPage />} />
            <Route path='/nft' element={<NftPage />} />
            <Route path='/complete' element={<CompletePage />} />
          </Routes>
        </div>
        <div className={styles.footer}>
          <a href='https://atonoy.co' target='_blank' rel='noreferrer'>
            <img src={corpLogoImage} className={styles.corpLogoImage} />
          </a>
        </div>
      </main>
    </Router>
  );
}

export default App;

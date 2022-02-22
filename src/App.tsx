import TokenPage from './pages/TokenPage';
import TopPage from './pages/TopPage';
import backImage from './assets/background-image.jpg';
import corpLogoImage from './assets/atonoy-logo.png';
import logoImage from './assets/smt-logo.svg';
import {Grid} from '@mui/material';
import {
  Routes,
  Route,
  Link
} from 'react-router-dom';
import NftPage from './pages/NftPage';
import CompletePage from './pages/CompletePage';
import FaucetPage from './pages/FaucetPage';

const styles = {
  root: {
    position: 'relative' as 'relative',
    textAlign: 'center' as 'center',
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
    position: 'absolute' as 'absolute',
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
};

const App = () => {
  return (
    <main style={styles.root}>
      <div style={styles.navi}>
        <Grid container
          alignItems='center'
          justifyContent='center'
          sx={styles.grid}
        >
          <Grid item xs={3}>
            <a href='/'><img src={logoImage} alt='Smart token tool' /></a>
          </Grid>
          <Grid item xs={6}>
            <div style={styles.naviLink}>
              <Link to='/token' style={styles.link}>Token</Link>
            </div>
            <div style={styles.naviLink}>
              <Link to='/nft' style={styles.link}>NFT</Link>
            </div>
            <div style={styles.naviLink}>
              <Link to='/faucet' style={styles.link}>Faucet</Link>
            </div>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
        <Routes>
          <Route path='/' element={<TopPage />} />
          <Route path='/token' element={<TokenPage />} />
          <Route path='/nft' element={<NftPage />} />
          <Route path='/faucet' element={<FaucetPage />} />
          <Route path='/complete' element={<CompletePage />} />
        </Routes>
      </div>
      <div style={styles.footer}>
        <a href='https://atonoy.co' target='_blank' rel='noreferrer'>
          <img src={corpLogoImage} style={styles.corpLogoImage} alt='Atonoy' />
        </a>
      </div>
    </main>
  );
}

export default App;

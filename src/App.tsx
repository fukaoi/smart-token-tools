import {makeStyles} from '@mui/styles';
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
import {useEffect, useState} from 'react';

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
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [cache, setCache] = useState<Window>(window);

  useEffect(() => {
    if (cache.solana) {
      console.debug('#read cache');
      cache.solana.connect({onlyIfTrusted: true}).then((conn: any) => {
        setWalletAddress(conn.publicKey.toString());
      });
    } else {
      console.debug('#read window object');
      setTimeout(() => {
        window.solana.connect({onlyIfTrusted: true}).then((conn: any) => {
          console.debug('#setCache()');
          setCache(window);
          setWalletAddress(conn.publicKey.toString());
        });
      }, 1000);
    }
    const id = setInterval(() => {
      console.debug('#setInterval');
      cache.solana.connect({onlyIfTrusted: true}).then((conn: any) => {
        console.debug('#setWalletAddress: ', conn.publicKey.toString());
        setWalletAddress(conn.publicKey.toString());
      });
    }, 5000);
    return () => clearInterval(id);
  }, [cache, walletAddress]);

  return (
    <main className={styles.root}>
      <div className={styles.navi}>
        <Grid container
          alignItems='center'
          justifyContent='center'
          className={styles.grid}
        >
          <Grid item xs={3}>
            <a href='/'><img src={logoImage} alt='Smart token tool' /></a>
          </Grid>
          <Grid item xs={6}>
            <div className={styles.naviLink}>
              <Link to='/token' className={styles.link}>Token</Link>
            </div>
            <div className={styles.naviLink}>
              <Link to='/nft' className={styles.link}>NFT</Link>
            </div>
            <div className={styles.naviLink}>
              <Link to='/faucet' className={styles.link}>Faucet</Link>
            </div>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
        <Routes>
          <Route path='/' element={<TopPage />} />
          <Route path='/token' element={<TokenPage currentAddress={walletAddress} />} />
          <Route path='/nft' element={<NftPage />} />
          <Route path='/faucet' element={<FaucetPage currentAddress={walletAddress} />} />
          <Route path='/complete' element={<CompletePage />} />
        </Routes>
      </div>
      <div className={styles.footer}>
        <a href='https://atonoy.co' target='_blank' rel='noreferrer'>
          <img src={corpLogoImage} className={styles.corpLogoImage} alt='Atonoy' />
        </a>
      </div>
    </main>
  );
}

export default App;

import TokenPage from './pages/TokenPage';
import TopPage from './pages/TopPage';
import backImage from './assets/background-image.jpg';
import corpLogoImage from './assets/atonoy-logo.png';
import logoImage from './assets/smt-logo.svg';
import { Grid, Box, useMediaQuery } from '@mui/material';
import { Routes, Route, Link } from 'react-router-dom';
import NftPage from './pages/NftPage';
import CompletePage from './pages/CompletePage';
import NftCompletePage from './pages/NftCompletePage';
import FaucetPage from './pages/FaucetPage';
import { Device } from './shared/device';

declare global {
  interface Window {
    solana: any;
  }
  interface NavigateOptions {
    state: {
      warning?: string;
      error?: string;
      mint?: string;
    };
  }
}

const styles = {
  root: {
    position: 'relative' as 'relative',
    textAlign: 'center' as 'center',
    backgroundSize: 'cover',
    backgroundImage: `url(${backImage})`,
    backgroundPosition: 'center',
    minHeight: '100vh',
    maxHeight: '100%',
    width: '100%',
    alignItems: 'center',
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
  },
  logoImage: {
    alignItems: 'center',
    marginBottom: '0',
  },
};

const App = () => {
  const match1100 = useMediaQuery('(min-width:1150px)');
  const match1024 = useMediaQuery('(min-width:1024px)');
  const match600 = useMediaQuery('(min-width:600px)');
  if (!match600) {
    styles.root.minHeight = '120vh';
    styles.logoImage.marginBottom = '6em';
  } else if (!match1024) {
    styles.root.minHeight = '120vh';
    styles.logoImage.marginBottom = '5em';
  } else {
    styles.root.minHeight = '100vh';
    styles.logoImage.marginBottom = '0';
  }
  return (
    <Box sx={styles.root}>
      <Box sx={styles.navi}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={styles.grid}
        >
          <Grid item xs={3}>
            <Box sx={styles.logoImage}>
              <a href="/">
                <img src={logoImage} alt="Smart token tool" />
              </a>
            </Box>
          </Grid>
          <Grid item xs={6}>
            {!Device.isSmartPhone() && (
              <>
                <Box style={styles.naviLink}>
                  <Link to="/token" style={styles.link}>
                    Token
                  </Link>
                </Box>
                <Box style={styles.naviLink}>
                  <Link to="/nft" style={styles.link}>
                    NFT
                  </Link>
                </Box>
                <Box style={styles.naviLink}>
                  <Link to="/faucet" style={styles.link}>
                    Faucet
                  </Link>
                </Box>
              </>
            )}
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/token" element={<TokenPage />} />
          <Route path="/nft" element={<NftPage />} />
          <Route path="/faucet" element={<FaucetPage />} />
          <Route path="/complete" element={<CompletePage />} />
          <Route path="/nft-complete" element={<NftCompletePage />} />
        </Routes>
      </Box>
      {match1100 && (
        <Box sx={styles.footer}>
          <a href="https://atonoy.co" target="_blank" rel="noreferrer">
            <img
              src={corpLogoImage}
              style={styles.corpLogoImage}
              alt="Atonoy"
            />
          </a>
        </Box>
      )}
    </Box>
  );
};

export default App;

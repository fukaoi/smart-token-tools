import backImage from './assets/background-image.jpg';
import logoImage from './assets/smt-logo.svg';
import { Box, Grid } from '@mui/material';

// declare global {
//   interface Window {
//     solana: PhantomProvider;
//   }
//   interface NavigateOptions {
//     state: {
//       warning?: string;
//       error?: string;
//       mint?: string;
//     };
//   }
// }

const styles = {
  root: {
    position: 'relative' as const,
    textAlign: 'center' as const,
    backgroundSize: 'cover',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${backImage})`,
    backgroundPosition: 'center',
    minHeight: '100vh',
    maxHeight: '100%',
    width: '100%',
    alignItems: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
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

const Header = () => {
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
          {/*
          <Grid item xs={6}>
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
          </Grid>
         */}
        </Grid>
      </Box>
    </Box>
  );
};

export default Header;

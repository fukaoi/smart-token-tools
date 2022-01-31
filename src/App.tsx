import {useState} from 'react';
import {makeStyles} from '@mui/styles';
import TokenPage from './pages/TokenPage';
import TopPage from './pages/TopPage';
import backImage from './assets/background-image.jpg';
import SubmitButton from './components/button/SubmitButton';
import corpLogoImage from './assets/atonoy-logo.png';
import logoImage from './assets/smt-logo.svg';
import {Grid} from '@mui/material';

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
  }
});

const App = () => {
  const styles = useStyles();
  const [content, setContent] = useState('Main');

  const callWalletAdapter = () => {
    setContent('Token');
  }

  return (
    <main className={styles.root}>
      <div className={styles.navi}>
        <Grid container
          alignItems='center'
          justifyContent='center'
          style={{height: '10vh'}}
        >
          <Grid item xs={3}><a href='/'><img src={logoImage} /></a></Grid>
          <Grid item xs={6}>
            <div className={styles.naviLink}>Token</div>
            <div className={styles.naviLink}>NFT</div>
            <div className={styles.naviLink}>Contact</div>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={2}><SubmitButton title='Connect wallet' callbackFunc={(ev) => {console.log(ev)}} /></Grid>
        </Grid>
      </div>
      {
        content === 'Token'
          ? <TokenPage />
          : <TopPage callbackFunc={callWalletAdapter} />
      }
      <div className={styles.footer}><img src={corpLogoImage} className={styles.corpLogoImage} /></div>
    </main>
  );
}

export default App;

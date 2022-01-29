import {useState} from 'react';
import {makeStyles} from '@mui/styles';
import TokenPage from './pages/TokenPage';
import TopPage from './pages/TopPage';
import backImage from './assets/background-image.jpg';
import SubmitButton from './components/button/SubmitButton';
import corpLogoImage from './assets/atonoy-logo.png';
import logoImage from './assets/smt-logo.svg';

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
    position: 'absolute',
    bottom: '0',
    width: '100%',
    marginBottom: '10px'
  },
  corpLogoImage: {
    width: '130px',
  },
  logoImage: {
    alignSelf: 'left'
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
      <nav>
        <div className={styles.logoImage}>
          <img src={logoImage} />
        </div>
        <ul>
          <li>TOKEN</li>
          <li>NFT</li>
          <li>CONTACT</li>
        </ul>
        <SubmitButton title='Connect wallet' callbackFunc={(ev) => {console.log(ev)}} />
      </nav>
      {
        content === 'Token'
          ? <TokenPage />
          : <TopPage callbackFunc={callWalletAdapter} />
      }
      <div className={styles.footer}>
        <img src={corpLogoImage} className={styles.corpLogoImage} />
      </div>
    </main>
  );
}

export default App;

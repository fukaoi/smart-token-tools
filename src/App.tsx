import {useState} from 'react';
import {makeStyles} from '@mui/styles';
import TokenPage from './pages/TokenPage';
import TopPage from './pages/TopPage';
import backImage from './assets/background-image2.jpg';
import SubmitButton from './components/button/SubmitButton';
import atonoyLogoImage from './assets/atonoy-logo.png';

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
  atonoyLogoImage: {
    width: '130px',
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
        <div>
          <img src="img/logo.png" />
        </div>
        <ul>
          <li>Token</li>
          <li>NFT</li>
          <li>Contact</li>
        </ul>
        <SubmitButton title='Connect wallet' callbackFunc={() => {}} />
      </nav>
      {
        content === 'Token'
          ? <TokenPage />
          : <TopPage callbackFunc={callWalletAdapter} />
      }
      <div className={styles.footer}>
        <img src={atonoyLogoImage} className={styles.atonoyLogoImage} />
      </div>
    </main>
  );
}

export default App;

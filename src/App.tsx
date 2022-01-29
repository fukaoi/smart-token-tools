import {useState} from 'react';
import {makeStyles} from '@mui/styles';
import TokenPage from './pages/TokenPage';
import TopPage from './pages/TopPage';
import backImage from './assets/background-image2.jpg';
import SubmitButton from './components/button/SubmitButton';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    backgroundSize: 'cover',
    backgroundImage: `url(${backImage})`,
    backgroundPosition: 'ceter',
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'ceter',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
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
          <a href="#"><li>Token</li></a>
          <a href="#"><li>NFT</li></a>
          <a href="#"><li>Contact</li></a>
        </ul>
        <SubmitButton title='Connect wallet' callbackFunc={() => {}} />
      </nav>
      {
        content === 'Token'
          ? <TokenPage />
          : <TopPage callbackFunc={callWalletAdapter} />
      }
    </main>
  );
}

export default App;

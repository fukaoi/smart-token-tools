import {useState} from 'react';
import {makeStyles} from '@mui/styles';

import HeaderNavigation from './components/navigation/HeaderNavigation';
import TokenPage from './pages/TokenPage';
import TopPage from './pages/TopPage';
import backImage from './assets/background-image2.jpg';

const useStyles = makeStyles({
  app: {
    textAlign: 'center',
  },
  appMain: {
    backgroundSize: 'cover',
    backgroundImage: `url(${backImage})`,
    backgroundPosition: 'ceter',
    minHeight: '94vh',
    maxHeight: '150vh',
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
    <div className={styles.app}>
      <main className={styles.appMain}>
        {content === 'Token' ? <TokenPage /> : <TopPage callbackFunc={callWalletAdapter} />}
      </main>
    </div>
  );
}

export default App;

import {useState} from 'react';
import {makeStyles} from '@mui/styles';

import Header from './components/Header';
import Token from './pages/Token';
import Top from './pages/Top';
import backImage from './assets/background-image.jpg';

const useStyles = makeStyles({
  app: {
    textAlign: 'center',
  },
  appMain: {
    backgroundSize: 'cover',
    backgroundImage: `url(${backImage})`,
    minHeight: '100vh',
    maxHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'ceter',
    // justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  }
});

const App = () => {
  const styles = useStyles();
  const [content, setContent] = useState('Main');

  const callWalletAdapter = () => {
    // setContent('Token');
  }

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.appMain}>
        {content === 'Token' ? <Token /> : <Top parentFunc={callWalletAdapter} />}
      </main>
    </div>
  );
}

export default App;

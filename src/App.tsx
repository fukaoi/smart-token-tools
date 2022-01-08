import {useState} from 'react';
import {Button} from '@mui/material';
import {makeStyles} from '@mui/styles';

import Header from './components/Header';
import Token from './pages/Token';
import WellComeMessage from './components/WellComeMessage';
import UsageGuide from './components/UsageGuide';
import backImage from './assets/background-image.jpg';

const useStyles = makeStyles({
  app: {
    textAlign: 'center',
    margin: 0,
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
    'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif`,
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
  },
  appMain: {
    backgroundSize: 'cover',
    backgroundImage: `url(${backImage})`,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'ceter',
    justifyContent: 'center',
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
      <Header />
      <main className={styles.appMain}>
        {content == 'Token'
          ? <Token />
          : <div>
            <WellComeMessage />
            <UsageGuide />
            <Button
              variant='contained'
              size='large'
              color='secondary'
              style={{maxWidth: '250px', maxHeight: '50px', minWidth: '250px', minHeight: '50px'}}
              onClick={callWalletAdapter} 
            >Create start
            </Button>
          </div>
        }
      </main>
    </div>
  );
}

export default App;

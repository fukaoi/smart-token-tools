import {useState} from 'react';
import './App.css';
import {
  Button,
} from '@mui/material';

import Header from './components/Header';
import Token from './pages/Token';
import WellComeMessage from './components/WellComeMessage';


const App = () => {
  const [content, setContent] = useState('Main');

  const callWalletAdapter = () => {
    setContent('Token');
  }

  return (
    <div className='App'>
      <Header />
      <main className='App-main'>
        {content == 'Token'
          ? <Token />
          :
          <div>
            <WellComeMessage />
            <Button
              variant='contained'
              size='large'
              color='secondary'
              onClick={callWalletAdapter} >
              Wallet Connect
            </Button>
          </div>
        }
      </main>
    </div>
  );
}

export default App;

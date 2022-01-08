import './App.css';
import {
  Button,
} from '@mui/material';

import Header from './components/Header';

const App = () => {
  return (
    <div className="App">
      <Header />
      <main className="App-main">
        <Button
          variant="contained"
          size="large"
          color='secondary'
        >Wallet Connect</Button>
      </main>
    </div>
  );
}

export default App;

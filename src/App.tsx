import './App.css';
import {
  Button,
  createTheme,
  ThemeProvider,
} from '@mui/material';

import Header from './components/Header';

const App = () => {
  const theme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div className="App">
        <header className="App-header">
          <Button variant="contained" color="secondary">Wallet Connect</Button>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {theme} from './shared/colorTheme';
import {ThemeProvider} from '@mui/material/styles';
import {HashRouter as Router} from 'react-router-dom';
import {Buffer as buffer} from 'buffer';

global.Buffer = buffer; // @solana/spl-token Fix for raise error
 
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme} >
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

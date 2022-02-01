import {createTheme} from '@mui/material/styles';
import {indigo, deepOrange, grey} from '@mui/material/colors';


declare module '@mui/material/styles/createPalette' {
  interface Palette {    
    orangeGuradation: Palette['primary'];
    grey2: Palette['primary'];
  }

  interface PaletteOptions {    
    grey2: PaletteOptions['primary'];
    orangeGuradation: PaletteOptions['primary'];
  } 
}

declare module '@mui/material/Button' {
  export interface ButtonPropsColorOverrides {
    'orangeGuradation': true
    'grey': true
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: deepOrange[500],
    },
    orangeGuradation: {
      // main: 'linear-gradient(#FE6B8B 30%, #FF8E53 90%)',
      main: '#FF8E53',
    },
    grey2: {
      main: grey[500]
    },
  }
});

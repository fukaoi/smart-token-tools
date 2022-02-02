import {createTheme} from '@mui/material/styles';
import {indigo, deepOrange, grey} from '@mui/material/colors';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    orangeGuradation: Palette['primary'];
    deepGrey: Palette['primary'];
  }

  interface PaletteOptions {
    orangeGuradation: PaletteOptions['primary'];
    deepGrey: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  export interface ButtonPropsColorOverrides {
    'orangeGuradation': true
    'deepGrey': true
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
      main: 'linear-gradient(#FE6B8B 30%, #FF8E53 90%)',
    },
    deepGrey: {
      main: grey[600]
    },
  }
});

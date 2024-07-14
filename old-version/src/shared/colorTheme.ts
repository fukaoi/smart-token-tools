import { createTheme } from '@mui/material/styles';
import { deepOrange, grey, indigo, yellow } from '@mui/material/colors';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    blueGuradation: Palette['primary'];
    orangeGuradation: Palette['primary'];
    deepGrey: Palette['primary'];
    textBlack: Palette['primary'];
    limeLight: Palette['primary'];
    headLineBorder: Palette['primary'];
    headLineBackground: Palette['primary'];
  }

  interface PaletteOptions {
    blueGuradation: PaletteOptions['primary'];
    orangeGuradation: PaletteOptions['primary'];
    deepGrey: PaletteOptions['primary'];
    textBlack: PaletteOptions['primary'];
    limeLight: PaletteOptions['primary'];
    headLineBorder: PaletteOptions['primary'];
    headLineBackground: PaletteOptions['primary'];
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
      main: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },
    blueGuradation: {
      main: 'linear-gradient(45deg, rgb(33, 150, 243) 30%, rgb(33, 203, 243) 90%)',
    },
    deepGrey: {
      main: grey[600],
    },
    textBlack: {
      main: 'none solid rgba(0, 0, 0, 0, 0.87)',
      light: 'none solid rgba(0, 0, 0, 0, 0.6)',
    },
    limeLight: {
      main: yellow[50],
    },
    headLineBorder: {
      main: '3px solid #777777',
    },
    headLineBackground: {
      main: '#f1f1f1',
    },
  },
});

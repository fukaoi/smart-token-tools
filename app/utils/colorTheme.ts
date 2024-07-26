import { createTheme } from '@mui/material/styles';
import { grey, purple, yellow, teal } from '@mui/material/colors';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    orangeGuradation: Palette['primary'];
    deepGrey: Palette['primary'];
    textBlack: Palette['primary'];
    limeLight: Palette['primary'];
    headLineBorder: Palette['primary'];
    headLineBackground: Palette['primary'];
  }

  interface PaletteOptions {
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
      main: purple[700],
      light: purple[400],
    },
    secondary: {
      main: teal[600],
      light: teal[300],
    },
    orangeGuradation: {
      main: 'linear-gradient(45deg, indigo 30%, #FF8E53 90%)',
    },
    deepGrey: {
      main: grey[600],
    },
    textBlack: {
      main: 'rgba(0, 0, 0, 0, 0.87)',
      light: 'rgba(0, 0, 0, 0, 0.6)',
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

import {createTheme} from '@mui/material/styles';
import {indigo, deepOrange, pink} from '@mui/material/colors';


declare module "@mui/material/styles/createPalette" {
  interface Palette {    
    red: Palette["primary"];
  }

  interface PaletteOptions {    
    red: PaletteOptions["primary"];
  } 
}

declare module '@mui/material/Button' {
  export interface ButtonPropsColorOverrides {
    'red': true
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
    red: {
      main: pink[100],
    }
  }
});

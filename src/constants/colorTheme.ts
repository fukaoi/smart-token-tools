import {createTheme} from '@mui/material/styles';
import {indigo, deepOrange, pink} from '@mui/material/colors';
// import createPalette from '@mui/material/styles/createPalette';


declare module "@mui/material/styles/createPalette" {
  interface Palette {    
    red: Palette["primary"];
  }

  interface PaletteOptions {    
    red: PaletteOptions["primary"];
  } 
}

declare module '@mui/material/Chip' {
  export interface ChipPropsColorOverrides {
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

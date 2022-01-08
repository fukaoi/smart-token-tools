import {AppBar, Toolbar, Grid} from '@mui/material';
import Button from '@mui/material/Button';

const pages = ['Token', 'NFT', 'Contact'];
const Header = () => {
  return (
    <AppBar position="static" color="transparent" >
      <Toolbar>
        <Grid container>
          <Grid item xs={2}>
            <div className="Header-logo" />
          </Grid>
          <Grid item xs={7}>
          </Grid>
          <Grid item xs={3}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{my:1, color: 'black'}}
              >
                {page}
              </Button>
            ))}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
export default Header;

import {AppBar, Toolbar, Grid} from '@mui/material';
import Button from '@mui/material/Button';

const pages = ['Token', 'NFT', 'Contact'];

const Header = () => {
  return (
    <AppBar position="static" color="transparent" >
      <Toolbar sx={{height: 70}}>
        <Grid container>
          <Grid item xs={1}>
            <div className="Header-logo" />
          </Grid>
          <Grid item xs={8}>
          </Grid>
          <Grid item xs={3}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={console.log}
                sx={{my: 1, color: 'black'}}
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

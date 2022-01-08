import {AppBar, Toolbar} from '@mui/material';
import Button from '@mui/material/Button';

const pages = ['Token', 'NFT', 'CONTACT'];

const Header = () => {
  return (
    <AppBar position="static" color="transparent" >
      <Toolbar>
        <div className="Header-logo" />
        {pages.map((page) => (
          <Button
            key={page}
            onClick={console.log}
            sx={{my: 2, color: 'black', display: 'block' }}
          >
            {page}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};
export default Header;

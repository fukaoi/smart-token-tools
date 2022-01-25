import {AppBar, Toolbar, Grid, Box} from '@mui/material';
import Button from '@mui/material/Button';
import {Twitter, TokenOutlined, PaidOutlined} from '@mui/icons-material';
import headerLogo from '../assets/atonoy-logo.png';
import {makeStyles} from '@mui/styles';
import Token from '../pages/Token';

const useStyles = makeStyles({
  horizontal: {
    marginTop: '0px',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  logo: {
    marginTop: '5px',
    marginLeft: '-4em',
    width: '180px',
    height: '40px'
  } 
});

const goToPage = (pageName: string) => {
  console.log(pageName);
  return <Token />
}

const Header = () => {
  const styles = useStyles();
  return (
    <AppBar position='static' color='transparent'>
      <Toolbar>
        <Grid container>
          <Grid item xs={2}>
            <a href='https://atonoy.co'>
              <img src={headerLogo} className={styles.logo} alt='atonoy.co' />
            </a>
          </Grid>
          <Grid item xs={7}>
          </Grid>
          <Grid item xs={3}>
            <div className={styles.horizontal} >
              <PaidOutlined />
              <Button
                key='Token'
                onClick={() => goToPage('token')}
                sx={{my: 1, color: 'black'}}
              >Token
              </Button>
              <Box sx={{m: 1}} />
              <TokenOutlined />
              <Button
                key='NFT'
                sx={{my: 1, color: 'black', minWidth: '10px'}}
              >NFT
              </Button>
              <Box sx={{m: 1}} />
              <Twitter />
              <Button
                key='Contact'
                sx={{my: 1, color: 'black'}}
              >Contact
              </Button>
            </div>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
export default Header;

import {AppBar, Toolbar, Grid, Box} from '@mui/material';
import headerLogo from '../../assets/atonoy-logo.png';
import {makeStyles} from '@mui/styles';
import NavigationButton from '../button/NavigationButton';

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

// const goToPage = (pageName: string) => {
// console.log(pageName);
// return <Token />
// }

const NavigationButtons = () => {
  const data = [
    {
      name: 'Token',
      icon: 'PaidOutlined',
    },
    {
      name: 'NFT',
      icon: 'TokenOutlined',
    },
    {
      name: 'Contact',
      icon: 'Twitter',
    }
  ];
  const comp =
    (
      <>
        {data.map(d =>
          <NavigationButton
            callbackFunc={console.log}
            name={d.name}
            icon={d.icon}
          />
        )}
        <Box sx={{m: 1}} />
      </>
    );

  return comp;
}

const HeaderNavigation = () => {
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
              <NavigationButtons />
            </div>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
export default HeaderNavigation;

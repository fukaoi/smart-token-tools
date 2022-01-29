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
    <AppBar position='static' color='inherit' style={{ background: 'transparent !important', boxShadow: 'none'}}>
      <Toolbar>
        <Grid container>
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={8}>
          </Grid>
          <Grid item xs={2}>
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

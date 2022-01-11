import {makeStyles} from '@mui/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Grid} from '@mui/material';

import AtonoyMarkLogo from '../assets/atonoy-logo-mark.png';
import PhantomMarkLogo from '../assets/phantom-logo-mark.png'

const useStyles = makeStyles({
  cardMedia: {
    textAlign: 'center',
  },
  cardContainer: {
    position: 'relative',
    top: '7em',
    maxWidth: 350,
    height: '300px',
  },
});

const UsageGuide = () => {
  const styles = useStyles();
  return (
    <Grid container>
      <Grid item xs={2} />
      <Grid item xs={3}>
        <Card className={styles.cardContainer}>
          <CardMedia
            className={styles.cardMedia}
            component="img"
            image={PhantomMarkLogo} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Need1. Install wallet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={3}>
        <Card className={styles.cardContainer}>
          <CardMedia
            className={styles.cardMedia}
            component="img"
            image={AtonoyMarkLogo}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Need2. Get Atonoy subscription token
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={2} />
    </Grid>
  );
}


export default UsageGuide;

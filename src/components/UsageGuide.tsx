import {makeStyles} from '@mui/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import AtonoyMarkLogo from '../assets/atonoy-logo-mark.png';
import PhantomMarkLogo from '../assets/phantom-logo-mark.png'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  cardMedia: {
    textAlign: 'center',
  },
  cardContainer: {
    position: 'relative',
    top: '5em',
    maxWidth: 350,
    height: '300px',
    marginLeft: '4em',
    marginRight: '4em'
  },
  cardAction: {
    justifyContent: 'center'
  }
});

const UsageGuide = () => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
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
        <CardActions className={styles.cardAction}>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
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
    </div>
  );
}

export default UsageGuide;

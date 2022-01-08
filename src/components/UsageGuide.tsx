import {makeStyles} from '@mui/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const useStyles = makeStyles({
  message: {
    marginBottom: '15em',
  },
  wellCome: {
    fontSize: '1.8em',
    fontWeight: 'bolder',
    marginBottom: '0.2em'
  },
  title: {
    fontSize: '3em',
  }
});

const UsageGuide = () => {
  const styles = useStyles();
  return (
    <Card sx={{ maxWidth: 350 }}>
      <CardMedia
        component="img"
        image="https://phantom.app/img/phantom-logo.svg" />
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
  );
}


export default UsageGuide;

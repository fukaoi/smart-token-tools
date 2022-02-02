import TitleTypography from "../components/typography/TitleTypography";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {makeStyles} from '@mui/styles';
import CompleteBackground from '../assets/complete-background.png';
import HeadlineTypography from '../components/typography/HeadlineTypography';
import AddressTypography from '../components/typography/AddressTypography';

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
    marginTop: '1em',
    minWidth: '800px',
    maxWidth: '800px',
    maxHeight: 'auto',
    marginLeft: '4em',
    marginRight: '4em'
  },
  cardAction: {
    justifyContent: 'center'
  }
});


const CompletePage = () => {
  const styles = useStyles();
  return (
    <>
      <TitleTypography title='Complete' />
      <div className={styles.container}>
        <Card className={styles.cardContainer}>
          <CardMedia
            className={styles.cardMedia}
            component='img'
            image={CompleteBackground} />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              Mint Success!!
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Below info your mint info
            </Typography>
            <AddressTypography address='Minted key of your token' />
             <div style={{fontSize: '17px'}}>HeH2PRj4GEdLCsbKQ18LvwhbuH4anmPQ3HoeRsJmymVw</div>
             <br />
            <AddressTypography address='Minted total supply of your token' />
             <div style={{fontSize: '17px'}}>100000</div>
          </CardContent>
          Lets Go Explorer
        </Card>
      </div>
    </>
  );
};
export default CompletePage;

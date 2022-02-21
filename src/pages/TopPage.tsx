import WarningModal from '../components/modal/WarningModal';
import SubmitButton from '../components/button/SubmitButton';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import AtonoyMarkLogo from '../assets/atonoy-logo-mark.png';
import PhantomMarkLogo from '../assets/phantom-logo-mark.png'
import Button from '@mui/material/Button';

declare global {interface Window {solana: any}}

const styles = {
  message: {
    position: 'relative' as 'relative',
    top: '3em',
    marginBottom: '1em',
  },
  submit: {
    width: '100%',
    marginTop: '8em',
    marginBottom: '1em',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap' as 'wrap'
  },
  cardMedia: {
    textAlign: 'center',
  },
  cardContainer: {
    position: 'relative',
    top: '5em',
    maxWidth: 300,
    maxHeight: '500px',
    marginLeft: '4em',
    marginRight: '4em'
  },
  cardAction: {
    justifyContent: 'center'
  }
};

const WellComeMessage = () => {
  return (
    <div style={styles.message}>
      <Typography
        component='div'
        fontSize='23px'
        fontWeight='500'
      >LETS TOKEN ISSUE EASY AND QUICKLY
      </Typography>
      <Typography
        component='div'
        fontSize='2.4em'
        fontWeight='bold'
      >TOKEN AND NFT
      </Typography>
    </div>
  );
}

const TopPage = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [btnState, setBtnState] = useState(
    {
      title: 'Getting start',
      isDisabled: false
    }
  );
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    setBtnState({title: 'Confirm', isDisabled: false});
  };
  const connectHandler = () => {
    setBtnState({title: 'Processing', isDisabled: true});
    if (!window.solana) {
      setMessage(
        `You will need Phantom wallet to access.
       Please install it from the URL below.
       https://phantom.app/download`
      );
      setOpen(true);
    } else {
      window.solana.connect().then(() => {
        navigate('/token');
      });
    }
  };

  return (
    <>
      <WellComeMessage />
      <div style={styles.container}>
        <Card sx={styles.cardContainer}>
          <CardMedia
            sx={styles.cardMedia}
            component='img'
            image={PhantomMarkLogo} />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              Need1. Install wallet
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions sx={styles.cardAction}>
            <Button size='small'>Learn More</Button>
          </CardActions>
        </Card>
        <Card sx={styles.cardContainer}>
          <CardMedia
            sx={styles.cardMedia}
            component='img'
            image={AtonoyMarkLogo}
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              Need2. Get Atonoy subscription token
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Lizards are a widespread group of squamate reptiles, with over 6,000
              Lizards are a widespread group of squamate reptiles, with over 6,000
            </Typography>
          </CardContent>
          <CardActions sx={styles.cardAction}>
            <Button size='small'> Atonoy subscription token</Button>
          </CardActions>
        </Card>
      </div>

      <div style={styles.submit}>
        <SubmitButton
          isDisabled={btnState.isDisabled}
          title={btnState.title}
          callbackFunc={connectHandler}
        />
      </div>
      <WarningModal
        open={open}
        onClose={handleClose}
        message={message}
      />
    </>
  );
};
export default TopPage;

import WarningModal from '../components/modal/WarningModal';
import SubmitButton from '../components/button/SubmitButton';
import Typography from '@mui/material/Typography';
import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import PhantomMarkLogo from '../assets/phantom-logo-mark.png'
import Button from '@mui/material/Button';
import {Box, Link} from '@mui/material';
import {Device} from '../shared/device';

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
  },
  link: {
    textDecoration: 'none',
  }
};

const WellComeMessage = () => {
  return (
    <Box style={styles.message}>
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
    </Box>
  );
}

const TopPage = () => {
  const navigate = useNavigate();
  const {state} = useLocation() as NavigateOptions;
  const [warningModal, setWarningModal] = useState({open: false, message: ''});
  let title = 'Getting start';
  const [btnState, setBtnState] = useState(
    {
      title: title,
      isDisabled: false
    }
  );

  // raise warning other page
  useEffect(() => {
    if (state?.warning !== undefined) {
      setWarningModal({open: true, message: state.warning as string});
    }
  }, [state]);

  const handleClose = () => {
    setWarningModal({open: false, message: ''});
    setBtnState({title, isDisabled: false});
  };
  const connectHandler = () => {
    let title = 'Processing';
    setBtnState({title, isDisabled: true});
    if (Device.isSmartPhone()) {
      const message =
        `Sorry. Only available for PC access`;
      setWarningModal({open: true, message});
    } else if (!window.solana) {
      const message =
        `You will need Phantom wallet to access.
       Please install it from the URL below.
       https://phantom.app/download`
        ;
      setWarningModal({open: true, message});
    } else {
      window.solana.connect().then(() => {
        navigate('/token');
      });
    }
  };

  return (
    <>
      <WellComeMessage />
      <Box style={styles.container}>
        <Card sx={styles.cardContainer}>
          <CardMedia
            sx={styles.cardMedia}
            component='img'
            image={PhantomMarkLogo} />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              Need. Install Phantom wallet for Desktop
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              SMT only allows connections to phantom wallet,
              you must first install the phantom wallet extension on a phatom browser.
            </Typography>
          </CardContent>
          <CardActions sx={styles.cardAction}>
            <Link sx={styles.link} href='https://phantom.app/download'>
              <Button size='small'>Learn More</Button>
            </Link>
          </CardActions>
        </Card>
      </Box>

      <Box style={styles.submit}>
        <SubmitButton
          isDisabled={btnState.isDisabled}
          title={btnState.title}
          callbackFunc={connectHandler}
        />
      </Box>
      <WarningModal
        open={warningModal.open}
        onClose={handleClose}
        message={warningModal.message}
      />
    </>
  );
};
export default TopPage;

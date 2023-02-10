import WarningModal from '../components/modal/WarningModal';
import SubmitButton from '../components/button/SubmitButton';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import PhantomMarkLogo from '../assets/phantom-logo-mark.png';
import Button from '@mui/material/Button';
import { Box, Link } from '@mui/material';
import { Device } from '../shared/device';
import UserPolicyCheckBox from '../components/checkbox/userPolicyCheckbox';

const styles = {
  message: {
    position: 'relative' as const,
    top: '2em',
  },
  submit: {
    width: '100%',
    marginTop: '1.5em',
    marginBottom: '1em',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
  },
  cardMedia: {
    textAlign: 'center',
  },
  cardContainer: {
    position: 'relative',
    top: '4em',
    maxWidth: 300,
    maxHeight: '500px',
    marginLeft: '4em',
    marginRight: '4em',
  },
  cardAction: {
    justifyContent: 'center',
  },
  link: {
    textDecoration: 'none',
  },
  policyBox: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '6.5em',
  },
  policyCard: {
    width: 300,
  },
};

const WellComeMessage = () => {
  return (
    <Box style={styles.message}>
      <Typography component="div" fontSize="23px" fontWeight="500">
        LETS TOKEN ISSUE EASY AND QUICKLY
      </Typography>
      <Typography component="div" fontSize="2.4em" fontWeight="bold">
        TOKEN AND NFT
      </Typography>
    </Box>
  );
};

const TopPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as NavigateOptions;
  const [warningModal, setWarningModal] = useState({
    open: false,
    message: '',
  });
  const title = 'Getting start';
  const [btnState, setBtnState] = useState({
    title: title,
    isDisabled: true,
  });
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    setBtnState(prevState => ({ title, isDisabled: !prevState.isDisabled }));
  };

  // raise warning other page
  useEffect(() => {
    if (state?.warning !== undefined) {
      setWarningModal({ open: true, message: state.warning });
    }
  }, [state]);

  const handleClose = () => {
    setWarningModal({ open: false, message: '' });
    setBtnState({ title, isDisabled: true });
  };

  const connectHandler = () => {
    const title = 'Processing';
    setBtnState({ title, isDisabled: true });
    if (Device.isSmartPhone()) {
      const message = `Sorry. Only available for PC access`;
      setWarningModal({ open: true, message });
    } else if (!window.solana) {
      const message = `You will need Phantom wallet to access.
       Please install it from the URL below.
       https://phantom.app/download`;
      setWarningModal({ open: true, message });
    } else {
      window.solana.connect().then(() => {
        navigate('/nft');
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
            component="img"
            image={PhantomMarkLogo}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Need. Install Phantom wallet for Desktop
            </Typography>
            <Typography variant="body2" color="text.secondary">
              SMT only allows connections to phantom wallet, you must first
              install the phantom wallet extension on a phatom browser.
            </Typography>
          </CardContent>
          <CardActions sx={styles.cardAction}>
            <Link sx={styles.link} href="https://phantom.app/download">
              <Button size="small">Learn More</Button>
            </Link>
          </CardActions>
        </Card>
      </Box>

      <Box style={styles.policyBox}>
        <Box sx={styles.policyCard}>
          <UserPolicyCheckBox
            callbackFunc={toggleCheckbox}
            isChecked={isChecked}
          />
          <Box style={styles.submit}>
            <SubmitButton
              isDisabled={btnState.isDisabled}
              title={btnState.title}
              callbackFunc={connectHandler}
            />
          </Box>
        </Box>
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

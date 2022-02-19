import {makeStyles} from '@mui/styles';
import TitleTypography from "../components/typography/TitleTypography";
import DescriptionTypography from '../components/typography/DescriptionTypography';
import AddressTypography from '../components/typography/AddressTypography';
import {Paper, Box} from '@mui/material';
import SubmitButton from '../components/button/SubmitButton';
import CompleteModal from '../components/modal/CompleteModal';
import {useState} from 'react';

export interface FormValues {
  cluster: string,
  issueType: string,
  totalSupply: number,
  decimals: number,
  tokenKey?: string,
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  root: {
    marginTop: '1em',
    minWidth: '20em',
    maxWidth: '20em',
    padding: '1.2em',
  },
});

const FaucetPage = ({currentAddress}: any) => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const onSubmit = async () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };
  const description =
    `The value of this setting specifies the number of decimal points in the token. 
     Please refer to the example below.`;
  return (
    <>
      <TitleTypography title='FAUCET' />
      <div className={styles.container}>
        <Paper className={styles.root}>
          <AddressTypography address={currentAddress} />
          <DescriptionTypography message={description} />
        </Paper>
      </div>
      <Box sx={{mb: 6}} />
      <div>
        <SubmitButton
          title='Submit'
          callbackFunc={onSubmit}
        />
        <CompleteModal open={open} onClose={handleClose} />
      </div>
      <Box sx={{mb: 10}} />
    </>
  );
};
export default FaucetPage;

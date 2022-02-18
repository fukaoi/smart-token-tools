import {useState, useEffect} from 'react';
import {makeStyles} from '@mui/styles';
import {useForm} from 'react-hook-form';
import TitleTypography from "../components/typography/TitleTypography";
import DescriptionTypography from '../components/typography/DescriptionTypography';
import AddressTypography from '../components/typography/AddressTypography';
import {Paper, Box, FormControl} from '@mui/material';
import SubmitButton from '../components/button/SubmitButton';

export interface FormValues {
  cluster: string,
  issueType: string,
  totalSupply: number,
  decimals: number,
  tokenKey?: string,
}

const useStyles = makeStyles({
  root: {
    marginTop: '1em',
    minWidth: '20em',
    maxWidth: '20em',
    padding: '1.2em',
  },
});

const FaucetPage = () => {
  const styles = useStyles();
  const {handleSubmit, control, watch} = useForm<FormValues>({
    defaultValues: {
      cluster: 'devnet',
      issueType: 'new',
      totalSupply: 100000,
      decimals: 2,
      tokenKey: '',
    }
  });
  const onSubmit = async (data: FormValues) => {
  }
  const description =
    `The value of this setting specifies the number of decimal points in the token. 
     Please refer to the example below.`;
  return (
    <>
      <TitleTypography title='FAUCET' />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Paper className={styles.root}>
            <AddressTypography address='walletAddress' />
            <DescriptionTypography message={description} />
          </Paper>
          <Box sx={{mb: 6}} />
          <div>
            <SubmitButton
              title='Submit'
            />
          </div>
          <Box sx={{mb: 10}} />
        </FormControl>
      </form>
    </>
  );
};
export default FaucetPage;

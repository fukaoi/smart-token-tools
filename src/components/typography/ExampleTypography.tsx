import {FC} from 'react';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles({
  box: {
    textAlign: 'left',
    fontSize: '15px',
    marginLeft: '1em',
    marginBottom: '2em',
    color: '#555555',
  },
});

const ExampleTypography: FC<{example: string}> = ({example}) => {
  const styles = useStyles();
  return (
      <pre className={styles.box}>e.g: {example}</pre>
  );
}

export default ExampleTypography;

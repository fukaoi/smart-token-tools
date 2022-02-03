import {FC} from 'react';
import {makeStyles} from '@mui/styles';
import {theme} from '../../shared/colorTheme';

const useStyles = makeStyles({
  pre: {
    textAlign: 'left',
    fontSize: '15px',
    marginLeft: '1em',
    marginBottom: '2em',
    color: `${theme.palette.textBlack.light}`,
    backgroundColor: '#fff7eb',
    padding: '10px',
    borderRadius: '8px',
    fontFamily: 'Source Code Pro',
  },
});

const ExampleTypography: FC<{example: string}> = ({example}) => {
  const styles = useStyles();
  return (
    <pre className={styles.pre}>e.g:
      {example}
    </pre>
  );
}

export default ExampleTypography;

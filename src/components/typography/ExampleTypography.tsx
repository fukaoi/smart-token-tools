import {FC} from 'react';
import {theme} from '../../shared/colorTheme';

const styles = {
  pre: {
    textAlign: 'left' as 'left',
    fontSize: '15px',
    marginLeft: '1em',
    marginBottom: '2em',
    color: `${theme.palette.textBlack.light}`,
    backgroundColor: '#fff7eb',
    padding: '10px',
    borderRadius: '8px',
    fontFamily: 'Source Code Pro',
  },
};

const ExampleTypography: FC<{example: string}> = ({example}) => {
  return (
    <pre style={styles.pre}>e.g:
      {example}
    </pre>
  );
}

export default ExampleTypography;

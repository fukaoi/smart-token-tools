import { type ReactNode, useEffect, useState } from 'react';
import { theme } from '~/utils/colorTheme';

const styles = {
  box: {
    backgroundColor: theme.palette.common.white,
    transition: 'background-color 1s',
  },
  highlight: {
    backgroundColor: theme.palette.primary.light,
    transition: '',
    transitionDuration: '0s',
  },
};

const BackgroundBlur = ({ children }: { children: ReactNode }) => {
  const [style, setStyle] = useState(styles.box);
  useEffect(() => {
    setTimeout(() => {
      setStyle(styles.highlight);
    }, 50);
    setTimeout(() => {
      setStyle(styles.box);
    }, 100);
  }, []);

  return (
    <div id="bg-blur" style={style}>
      {children}
    </div>
  );
};

export default BackgroundBlur;

import { ReactNode, useEffect, useState } from 'react';

const styles = {
  box: {
    backgroundColor: '#fff',
    transition: 'background-color 1s',
  },
  highlight: {
    backgroundColor: '#FFB',
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

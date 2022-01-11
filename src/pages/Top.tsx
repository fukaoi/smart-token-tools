import {FC} from 'react';

import Button from '@mui/material/Button';
import WellComeMessage from '../components/WellComeMessage';
import UsageGuide from '../components/UsageGuide';


const Top: FC<{parentFunc: () => void}> = ({parentFunc}) => {
  return (
    <div>
      <WellComeMessage />
      <UsageGuide />
      <Button
        variant='contained'
        size='large'
        color='secondary'
        style={{maxWidth: '250px', maxHeight: '50px', minWidth: '250px', minHeight: '50px'}}
        onClick={parentFunc}
      >Create start
      </Button>

    </div>
  );
};
export default Top;

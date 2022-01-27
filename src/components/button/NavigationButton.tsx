import React, {FC} from 'react';
import Button from '@mui/material/Button';
import * as Icons from '@mui/icons-material'


const NavigationButton: FC<
  {
    callbackFunc: () => void,
    name: string,
    icon: string,
  }
> = (
  {
    callbackFunc,
    name,
    icon,
  }
) => {
    return (
      <>
        {React.createElement((Icons as any)[icon])}
        <Button
          key={name}
          onClick={callbackFunc}
          sx={{my: 1, color: 'black'}}
        >{name}
        </Button>
      </>
    );
  };
export default NavigationButton;

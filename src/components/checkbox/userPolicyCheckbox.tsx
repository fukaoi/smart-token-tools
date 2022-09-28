import { FC } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel, FormGroup } from '@mui/material';

const UserPolicyCheckBox: FC<{
  callbackFunc?: (event?: any) => void;
}> = ({ callbackFunc }) => {
  return (
    <>
      <FormGroup>
        <a style={{ fontSize: '15px' }} href="https://www.google.com/">
          外部リンクここ
        </a>
        <FormControlLabel
          value="agree"
          control={<Checkbox />}
          label="agree with the terms"
          labelPlacement="start"
        />
      </FormGroup>
    </>
  );
};
export default UserPolicyCheckBox;

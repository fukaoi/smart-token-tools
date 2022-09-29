import { FC } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel, FormGroup, Link } from '@mui/material';

const UserPolicyCheckBox: FC<{
  callbackFunc?: (event?: any) => void;
  isChecked: boolean;
}> = ({ callbackFunc }) => {
  return (
    <>
      <div style={{ position: 'relative', top: '30px' }}>
        <FormGroup>
          <FormControlLabel
            value="agree"
            onChange={callbackFunc}
            control={<Checkbox />}
            label={
              <p style={{ fontSize: '12px' }}>
                I agree to the
                <Link
                  style={{ marginLeft: '5px' }}
                  onClick={e => {
                    e.preventDefault();
                    alert('link clicked!');
                  }}
                >
                  terms & conditions
                </Link>
              </p>
            }
            labelPlacement="end"
          />
        </FormGroup>
      </div>
    </>
  );
};
export default UserPolicyCheckBox;

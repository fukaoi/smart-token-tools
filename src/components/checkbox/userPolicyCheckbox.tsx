import { FC } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel, FormGroup, Link } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

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
            control={
              <Checkbox
                color="primary"
                style={{
                  color: 'white',
                }}
              />
            }
            label={
              <p style={{ fontSize: '14px', fontWeight: 'bold' }}>
                I agree to SMT
                <Link
                  target="_blank"
                  color="inherit"
                  style={{ marginLeft: '5px', borderBottom: '15px ,#87cef' }}
                  onClick={e => {
                    e.preventDefault();
                    alert('In Preparation. Please wait.');
                  }}
                >
                  terms & conditions
                  <OpenInNewIcon style={{ position: 'relative', top: '5px', left: '5px' }} />
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

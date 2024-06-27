import { FC, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel, FormGroup, Link } from "@mui/material";
import TermsOfUseModal from "../../components/modal/TermsOfUseModal";

const UserPolicyCheckBox: FC<{
  callbackFunc?: (event?: any) => void;
  isChecked: boolean;
}> = ({ callbackFunc }) => {
  const [btnState, setBtnState] = useState(false);

  const handleClose = () => {
    setBtnState(false);
  };

  return (
    <>
      <div style={{ position: "relative", top: "30px" }}>
        <FormGroup>
          <FormControlLabel
            value="agree"
            onChange={callbackFunc}
            control={
              <Checkbox
                color="primary"
                style={{
                  color: "white",
                  marginTop: "7px",
                }}
              />
            }
            label={
              <p style={{ fontSize: "20px" }}>
                I agree to SMT
                <Link
                  target="_blank"
                  color="inherit"
                  style={{ marginLeft: "5px", borderBottom: "15px ,#87cef" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setBtnState(true);
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
      <TermsOfUseModal open={btnState} onClose={handleClose} />
    </>
  );
};
export default UserPolicyCheckBox;

import { FC } from "react";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import { theme } from "../../utils/colorTheme";

const StyledButton = styled(Button)({
  background: theme.palette.orangeGuradation.main,
  borderRadius: 3,
  color: "white",
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  width: "200px",
  height: "40px",
  position: "relative",
  textTransform: "capitalize",
});

const SubmitButton: FC<{
  title: string;
  callbackFunc?: (event?: any) => void;
  isDisabled?: boolean;
}> = ({ title, callbackFunc, isDisabled = false }) => {
  return (
    <StyledButton
      disabled={isDisabled}
      type="submit"
      onClick={callbackFunc}
      style={{ fontWeight: "550", fontSize: "15px" }}
    >
      {title}
    </StyledButton>
  );
};
export default SubmitButton;

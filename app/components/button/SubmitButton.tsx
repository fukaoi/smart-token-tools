import { FC } from "react";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import { theme } from "../../utils/colorTheme";

const StyledButton = styled(Button)({
  background: theme.palette.blueGuradation.main,
  borderRadius: 3,
  borderColor: "red",
  color: "white",
  width: "280px",
  height: "60px",
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
      style={{ fontWeight: "550", fontSize: "20px" }}
    >
      {title}
    </StyledButton>
  );
};
export default SubmitButton;

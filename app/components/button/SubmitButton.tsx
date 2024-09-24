import type { FC } from "react";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import { theme } from "~/utils/colorTheme";

const StyledButton = styled(Button)({
  background: theme.palette.primary.main,
  boxShadow: "0 10px 25px 0 rgba(0, 0, 0, .5)",
  borderRadius: "4px",
  width: "150px",
  position: "relative",
  textTransform: "capitalize",
  color: "white",
  "&:hover": {
    backgroundColor: "rgb(1, 130, 105, 0.5)",
  },
});

const SubmitButton: FC<{
  title: string;
  onClick?: (event?: any) => void;
  isDisabled?: boolean;
}> = ({ title, onClick, isDisabled = false }) => {
  return (
    <StyledButton
      disabled={isDisabled}
      type="submit"
      onClick={onClick}
    >
      {title}
    </StyledButton>
  );
};
export default SubmitButton;

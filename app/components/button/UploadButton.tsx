import { FC } from "react";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import { theme } from "~/utils/colorTheme";

const StyledButton = styled(Button)({
  root: {
    background: theme.palette.orangeGuradation.main,
    borderRadius: 12,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    width: "200px",
    height: "40px",
    position: "relative",
    textAlign: "left",
    marginTop: "1em",
    marginRight: "447px",
  },
  label: {
    textTransform: "capitalize",
  },
});

const UploadButton: FC<{
  title: string;
  callbackFunc?: (event?: any) => void;
  isDisabled?: boolean;
}> = ({ title, callbackFunc, isDisabled = false }) => {
  return (
    <label htmlFor={`upload-button`}>
      <input
        accept="image/*"
        name={"upload-button"}
        style={{ display: "none" }}
        multiple
        type="file"
      />
      <StyledButton
        disabled={isDisabled}
        type="submit"
        onClick={callbackFunc}
        style={{ fontWeight: "550", fontSize: "15px" }}
      >
        {title}
      </StyledButton>
    </label>
  );
};
export default UploadButton;

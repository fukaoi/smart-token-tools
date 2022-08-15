import { FC } from "react";
import { withStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { IconButton } from "@mui/material";

const StyledButton = withStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    color: "white",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    width: "200px",
    height: "40px",
    position: "relative",
  },
  label: {
    textTransform: "capitalize",
  },
})(Button);

const OptionalButton: FC<{
  callbackFunc?: (event?: any) => void;
  isOpen?: boolean;
}> = ({ callbackFunc, isOpen }) => {
  return (
    <>
      <IconButton type="button" onClick={callbackFunc}>
        {isOpen ? <RemoveCircleIcon /> : <AddCircleOutlineIcon />}
      </IconButton>
    </>
  );
};
export default OptionalButton;

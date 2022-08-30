import { FC } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { IconButton } from "@mui/material";

const OptionalButton: FC<{
  callbackFunc?: (event?: any) => void;
  isOpen?: boolean;
}> = ({ callbackFunc, isOpen }) => {
  return (
    <>
      <div>
        <span
          style={{
            fontWeight: "550",
            fontSize: "18px",
            marginBottom: "15px",
          }}
        >
          Optional
        </span>
        <IconButton type="button" size="medium" onClick={callbackFunc}>
          {isOpen ? <RemoveCircleIcon /> : <AddCircleOutlineIcon />}
        </IconButton>
      </div>
    </>
  );
};
export default OptionalButton;

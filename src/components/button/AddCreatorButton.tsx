import { FC } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { IconButton } from "@mui/material";

const AddCreatorButton: FC<{
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
          Add Creator
        </span>
        <IconButton type="button" size="medium" onClick={callbackFunc}>
          <AddCircleOutlineIcon />
        </IconButton>
      </div>
    </>
  );
};
export default AddCreatorButton;

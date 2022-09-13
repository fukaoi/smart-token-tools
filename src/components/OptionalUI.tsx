import { Box } from "@mui/material";
import { FC } from "react";
import { ControllerRenderProps } from "react-hook-form";
import RoyaltyTextField from "./textField/RoyaltyTextField";
import CollectionTextField from "./textField/CollectionTextField";
import CreatorUI from "./CreatorUI";
import AddCreatorButton from "./button/AddCreatorButton";

export type OptionalUIProps = {
  isShow: boolean;
  field?: ControllerRenderProps;
  register?: any;
  control?: any;
};

const OptionalUI: FC<OptionalUIProps> = ({ control }) => {
  const handleAddButton = () => {
    // console.log("props", props);
    // console.log("control", props.control);
  };

  return (
    <>
      <Box sx={{ mb: 4 }} />
      <RoyaltyTextField control={control} name="royalty" />
      <Box sx={{ mb: 4 }} />
      <CreatorUI {...{ control }} />
      <Box sx={{ mb: 4 }} />
      <AddCreatorButton callbackFunc={handleAddButton} />
      <Box sx={{ mb: 4 }} />
      <CollectionTextField control={control} name="collection" />
    </>
  );
};

export default OptionalUI;

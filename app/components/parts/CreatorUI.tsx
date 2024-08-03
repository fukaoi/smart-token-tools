import { Box } from "@mui/material";
import { FC } from "react";
import { Control } from "react-hook-form";
import { Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import HeadlineTypography from "../typography/HeadlineTypography";
import WalletAddressTextField from "../textField/WalletAddressTextField";
import ShareTextField from "../textField/ShareTextField";
import { NFTMetadata } from "~/types";
import { validationRules } from "~/utils/validation";

export type CreatorUIProps = {
  fields?: any;
  remove?: any;
  control?: Control<NFTMetadata>;
};

const styles = {
  rightButton: {
    cursor: "pointer",
    paddingLeft: "80%",
  },
};

const CreatorUI: FC<CreatorUIProps> = ({ control, fields, remove }) => {
  return (
    <>
      {fields.map((field: any, index: number) => (
        <div key={field.id}>
          <Box sx={{ mb: 4 }} />
          <HeadlineTypography message="Creator Info Input Form" />
          <WalletAddressTextField
            control={control}
            name={`creators.${index}.address`}
          />
          <Box sx={{ mb: 4 }} />
          <ShareTextField
            control={control}
            name={`creators.${index}.share`}
            rules={validationRules.share}
          />
          <Box sx={{ mb: 4 }} />
          {index > 0 && (
            <DeleteIcon
              sx={styles.rightButton}
              onClick={() => remove(index)}
            />
          )}
          <Box sx={{ mb: 3 }} />
          <Divider />
        </div>
      ))}
    </>
  );
};
export default CreatorUI;

import { Box } from '@mui/material';
import { FC } from 'react';
import {
  Control,
  ControllerRenderProps,
  useFieldArray,
  UseFormRegister,
} from 'react-hook-form';
import WalletAddressTextField from './textField/WalletAddressTextField';
import VerifiedRadio from './radio/VerifiedRadio';
import ShareTextField from './textField/ShareTextField';
import HeadlineTypography from './typography/HeadlineTypography';
import AddCreatorButton from './button/AddCreatorButton';
import { Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { NFTFormValues } from '../pages/NftPage';

export type CreatorUIProps = {
  field?: ControllerRenderProps;
  register?: UseFormRegister<NFTFormValues>;
  control?: Control<NFTFormValues>;
};

const styles = {
  rightButton: {
    cursor: 'pointer',
    paddingLeft: '80%',
  },
};

const CreatorUI: FC<CreatorUIProps> = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    name: 'creators',
    control,
  });

  const handleAddButton = () => {
    append({
      address: '',
      share: 0,
      verified: false,
    });
  };

  // TODO: Validation 追加 暫定対応
  // TODO: NFTロジックリファクタ
  // TODO: ADD Creator ボタンを最下部に一つのみ
  // TODO: 完了後の画面実装

  return (
    <>
      {fields.map((field, index) => (
        <div key={field.id}>
          <Box sx={{ mb: 4 }} />
          <HeadlineTypography message="Creator Info Input Form" />

          <WalletAddressTextField
            control={control}
            name={`creators[${index}].address`}
          />
          <Box sx={{ mb: 4 }} />
          <ShareTextField control={control} name={`creators[${index}].share`} />
          <Box sx={{ mb: 4 }} />
          <HeadlineTypography message=" Select Verified" />
          <VerifiedRadio
            control={control}
            name={`creators[${index}].verified`}
          />
          <Box sx={{ mb: 4 }} />
          {index > 0 && (
            <DeleteIcon
              sx={styles.rightButton}
              aria-label="delete"
              type="button"
              onClick={() => remove(index)}
              size="sm"
            />
          )}
          <Box sx={{ mb: 3 }} />
          <Divider />
          <AddCreatorButton callbackFunc={handleAddButton} />
        </div>
      ))}
    </>
  );
};
export default CreatorUI;

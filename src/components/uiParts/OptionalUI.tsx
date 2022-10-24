import { Box } from '@mui/material';
import { FC } from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import RoyaltyTextField from '../textField/RoyaltyTextField';
import CreatorUI from './CreatorUI';
import AddCreatorButton from '../button/AddCreatorButton';
import { NFTFormValues } from '../../pages/NftPage';
import { validationRules } from '../../shared/validation';

export type OptionalUIProps = {
  isShow: boolean;
  control?: Control<NFTFormValues>;
};

const OptionalUI: FC<OptionalUIProps> = ({ isShow, control }) => {
  const { fields, append, remove } = useFieldArray({
    name: `creators`,
    control,
  });

  const handleAddButton = () => {
    append({
      address: '',
      share: 0,
      verified: false,
    });
  };

  return isShow ? (
    <>
      <Box sx={{ mb: 4 }} />
      <RoyaltyTextField
        control={control}
        name="royalty"
        rules={validationRules.royalty}
      />
      <Box sx={{ mb: 4 }} />
      <CreatorUI {...{ control, fields, remove }} />
      <Box sx={{ mb: 4 }} />
      <AddCreatorButton callbackFunc={handleAddButton} />
    </>
  ) : null;
};

export default OptionalUI;

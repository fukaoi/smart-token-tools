import { Box } from '@mui/material';
import { FC } from 'react';
import {
  Control,
  ControllerRenderProps,
  UseFormRegister,
} from 'react-hook-form';
import RoyaltyTextField from './textField/RoyaltyTextField';
import CreatorUI from './CreatorUI';

import { NFTFormValues } from '../pages/NftPage';

export type OptionalUIProps = {
  isShow: boolean;
  field?: ControllerRenderProps;
  register?: UseFormRegister<NFTFormValues>;
  control?: Control<NFTFormValues>;
};

const validationRules = {
  royalty: {
    min: { value: 0, message: 'Minimum value is 0' },
    max: { value: 100, message: 'Maximum value is 100' },
  },
};

const OptionalUI: FC<OptionalUIProps> = ({ isShow, control }) => {
  return isShow ? (
    <>
      <Box sx={{ mb: 4 }} />
      <RoyaltyTextField
        control={control}
        name="royalty"
        rules={validationRules.royalty}
      />
      <Box sx={{ mb: 4 }} />
      <CreatorUI {...{ control }} />

      <Box sx={{ mb: 4 }} />
    </>
  ) : null;
};

export default OptionalUI;

import { Box } from '@mui/material';
import { FC } from 'react';
import {
  Control,
  ControllerRenderProps,
  UseFormRegister,
} from 'react-hook-form';
import RoyaltyTextField from './textField/RoyaltyTextField';
import CollectionTextField from './textField/CollectionTextField';
import CreatorUI from './CreatorUI';
import { NFTFormValues } from '../pages/NftPage';

export type OptionalUIProps = {
  isShow: boolean;
  field?: ControllerRenderProps;
  register?: UseFormRegister<NFTFormValues>;
  control?: Control<NFTFormValues>;
};

const OptionalUI: FC<OptionalUIProps> = ({ isShow, control }) => {
  return isShow ? (
    <>
      <Box sx={{ mb: 4 }} />
      <RoyaltyTextField control={control} name="royalty" />
      <Box sx={{ mb: 4 }} />
      <CreatorUI {...{ control }} />
      <Box sx={{ mb: 4 }} />
      <CollectionTextField control={control} name="collection" />
    </>
  ) : null;
};

export default OptionalUI;

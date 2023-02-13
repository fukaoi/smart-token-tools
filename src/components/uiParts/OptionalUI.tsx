import { Box } from '@mui/material';
import { FC, useState } from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import RoyaltyTextField from '../textField/RoyaltyTextField';
import CreatorUI from './CreatorUI';
import AddCreatorButton from '../button/AddCreatorButton';
import { NFTFormValues } from '../../pages/NftPage';
import HeadlineTypography from '../typography/HeadlineTypography';
import MediaFileUploadUI from '../uiParts/MediaFileUploadUI';
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
  const [mediaPreview, setMediaPreview] = useState<File | string | undefined>(
    undefined,
  );
  const [mediaFileBuffer, setMediaFileBuffer] = useState<ArrayBuffer>();
  const [errorModal, setErrorModal] = useState({ open: false, message: '' });
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
      <HeadlineTypography message="Optional media Upload" />
      <Box sx={{ mb: 4 }} />
      <MediaFileUploadUI
        {...{
          mediaPreview,
          setErrorModal,
          setMediaPreview,
          setMediaFileBuffer,
        }}
      />
      <CreatorUI {...{ control, fields, remove }} />
      <Box sx={{ mb: 4 }} />
      <AddCreatorButton callbackFunc={handleAddButton} />
      <Box sx={{ mb: 4 }} />
    </>
  ) : null;
};

export default OptionalUI;

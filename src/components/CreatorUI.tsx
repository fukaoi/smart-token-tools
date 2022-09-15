import { Box } from '@mui/material'
import { FC } from 'react'
import {
  Control,
  ControllerRenderProps,
  useFieldArray,
  UseFormRegister,
} from 'react-hook-form'
import WalletAddressTextField from './textField/WalletAddressTextField'
import VerifiedRadio from './radio/VerifiedRadio'
import ShareTextField from './textField/ShareTextField'
import HeadlineTypography from './typography/HeadlineTypography'
import AddCreatorButton from './button/AddCreatorButton'

import { NFTFormValues } from '../pages/NftPage'

export type CreatorUIProps = {
  field?: ControllerRenderProps
  register?: UseFormRegister<NFTFormValues>
  control?: Control<NFTFormValues>
}

const CreatorUI: FC<CreatorUIProps> = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    name: 'creators',
    control,
  })

  const handleAddButton = () => {
    append({
      address: '',
      share: 0,
      verified: false,
    })
  }

  return (
    <>
      {fields.map((item, index) => (
        <div key={item.id}>
          <Box sx={{ mb: 4 }} />
          <HeadlineTypography message="Creator Info Input Form" />
          <WalletAddressTextField control={control} name="address" />
          <Box sx={{ mb: 4 }} />
          <ShareTextField control={control} name="share" />
          <Box sx={{ mb: 4 }} />
          <HeadlineTypography message="Verified" />
          <VerifiedRadio control={control} name="verified" />
          <Box sx={{ mb: 4 }} />
          <AddCreatorButton callbackFunc={handleAddButton} />
        </div>
      ))}
    </>
  )
}
export default CreatorUI

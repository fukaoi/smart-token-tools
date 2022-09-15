import { FC } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

type LoadingProps = {
  isLoading: boolean
}

const style = {
  box: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 70,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 1,
  },
}

const Loading: FC<LoadingProps> = ({ isLoading }) => {
  return isLoading ? (
    <Box sx={style.box}>
      <CircularProgress color="info" />
    </Box>
  ) : null
}
export default Loading

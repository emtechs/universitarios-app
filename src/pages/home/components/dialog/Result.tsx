import { Typography } from '@mui/material'
import {
  BaseContentChildren,
  DialogBaseChildren,
  iAction,
} from '../../../../shared'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'
dayjs.extend(localizedFormat)

interface iDialogResultProps {
  data: iAction
  open: boolean
  onClose: () => void
}

export const DialogResult = ({ data, onClose, open }: iDialogResultProps) => {
  return (
    <DialogBaseChildren
      open={open}
      onClose={onClose}
      title="Histórico Detalhado"
      description=""
    >
      <BaseContentChildren>
        <Typography>{dayjs(data.created_at).format('LLLL')}</Typography>
        <Typography>{data.description}</Typography>
        <Typography>{data.justification}</Typography>
        <Typography>{data.user.name}</Typography>
      </BaseContentChildren>
    </DialogBaseChildren>
  )
}

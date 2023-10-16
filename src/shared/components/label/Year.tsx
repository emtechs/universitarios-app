import { Chip, Skeleton } from '@mui/material'
import { Today } from '@mui/icons-material'
import {
  LinkChip,
  iLabelBaseProps,
  useAppThemeContext,
  useCalendarContext,
} from '../../../shared'

export const LabelYear = ({ clickable, to }: iLabelBaseProps) => {
  const { loading } = useAppThemeContext()
  const { yearSelect } = useCalendarContext()

  const label = loading ? <Skeleton width={100} /> : yearSelect?.label

  return clickable ? (
    <LinkChip
      label={label}
      icon={<Today sx={{ mr: 0.5 }} fontSize="inherit" />}
      to={to}
    />
  ) : (
    <Chip
      color="primary"
      label={label}
      icon={<Today sx={{ mr: 0.5 }} fontSize="inherit" />}
    />
  )
}

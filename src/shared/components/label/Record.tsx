import { Chip, Skeleton } from '@mui/material'
import { FolderShared } from '@mui/icons-material'
import {
  LinkChip,
  adaptNameSchool,
  iLabelBaseProps,
  useAppThemeContext,
  useStudentContext,
} from '../../../shared'

export const LabelRecord = ({ clickable, to }: iLabelBaseProps) => {
  const { mdDown, loading } = useAppThemeContext()
  const { recordSelect } = useStudentContext()

  const label = loading ? (
    <Skeleton width={100} />
  ) : mdDown ? (
    adaptNameSchool(recordSelect?.label)
  ) : (
    recordSelect?.label
  )

  return clickable ? (
    <LinkChip
      label={label}
      icon={<FolderShared sx={{ mr: 0.5 }} fontSize="inherit" />}
      to={to}
    />
  ) : (
    <Chip
      color="primary"
      label={label}
      icon={<FolderShared sx={{ mr: 0.5 }} fontSize="inherit" />}
    />
  )
}

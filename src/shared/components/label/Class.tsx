import { Chip, Skeleton } from '@mui/material'
import { Workspaces } from '@mui/icons-material'
import {
  iLabelBaseProps,
  useAppThemeContext,
  useClassContext,
  adaptNameSchool,
  LinkChip,
} from '../../../shared'

export const LabelClass = ({ clickable, to }: iLabelBaseProps) => {
  const { mdDown, loading } = useAppThemeContext()
  const { classSelect } = useClassContext()

  const label = loading ? (
    <Skeleton width={100} />
  ) : mdDown ? (
    adaptNameSchool(classSelect?.label, 15)
  ) : (
    classSelect?.label
  )

  return clickable ? (
    <LinkChip
      label={label}
      icon={<Workspaces sx={{ mr: 0.5 }} fontSize="inherit" />}
      to={to}
    />
  ) : (
    <Chip
      color="primary"
      label={label}
      icon={<Workspaces sx={{ mr: 0.5 }} fontSize="inherit" />}
    />
  )
}

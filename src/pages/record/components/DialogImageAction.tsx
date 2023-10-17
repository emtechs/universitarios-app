import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { iChildren } from '../../../shared'

interface iDialogImageActionProps extends iChildren {
  open: boolean
  onClose: () => void
  title: string
  description: string
  confirmed: () => void
  refused: () => void
}

export const DialogImageAction = ({
  open,
  onClose,
  children,
  title,
  description,
  confirmed,
  refused,
}: iDialogImageActionProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={confirmed}>Aprovar</Button>
        <Button onClick={refused} autoFocus>
          Recusar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

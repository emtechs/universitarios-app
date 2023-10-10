import { useCallback } from 'react'
import { iStatus } from '../../shared'
import {
  Cancel,
  CheckCircle,
  Pending,
  Sync,
  UploadFile,
} from '@mui/icons-material'
import { Tooltip } from '@mui/material'

export const useIconStatus = () => {
  const defineIconStatus = useCallback(
    (status: iStatus = 'RECEIVED') => {
      switch (status) {
        case 'ANALYZING':
          return (
            <Tooltip title="Documento em análise">
              <Sync color="warning" />
            </Tooltip>
          )

        case 'CONFIRMED':
          return (
            <Tooltip title="Documento validado">
              <CheckCircle color="success" />
            </Tooltip>
          )

        case 'PENDING':
          return (
            <Tooltip title="Documento pendente">
              <Pending color="disabled" />
            </Tooltip>
          )

        case 'RECEIVED':
          return (
            <Tooltip title="Documento recebido">
              <UploadFile color="info" />
            </Tooltip>
          )

        case 'REFUSED':
          return (
            <Tooltip title="Documento recusado">
              <Cancel color="error" />
            </Tooltip>
          )

        default:
          return <></>
      }
    },

    [],
  )

  return { defineIconStatus }
}

import { useEffect, useState } from 'react'
import { Box, Divider, Grid, Paper, Typography } from '@mui/material'
import { AccountBox, Today } from '@mui/icons-material'
import {
  ChildrenLoading,
  DialogEditPassword,
  DialogEditProfile,
  apiCalendar,
  iPeriod,
  statusPtBr,
  useAuthContext,
} from '../../../shared'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'
dayjs.extend(localizedFormat)

interface iUserProps {
  status?: string
}

export const User = ({ status }: iUserProps) => {
  const { userProfile } = useAuthContext()
  const [periodData, setPeriodData] = useState<iPeriod>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (userProfile?.record_id) {
      setLoading(true)
      apiCalendar
        .retrievePeriod(userProfile.record_id)
        .then((res) => setPeriodData(res))
        .finally(() => setLoading(false))
    }
  }, [])

  return (
    <>
      <Grid item xs={12} md={3} width="100%">
        <Box mb={2} component={Paper}>
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={1}
          >
            <Typography
              component="div"
              variant="body1"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <Today />
              Referência
            </Typography>
          </Box>
          <Divider />
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            p={1}
            gap={1}
          >
            <Typography
              variant="subtitle2"
              fontWeight="bolder"
              textAlign="center"
            >
              {dayjs().format('dddd, LL')}
            </Typography>
            <ChildrenLoading isLoading={loading}>
              <Typography variant="h6" fontWeight="bolder">
                {periodData?.name}
              </Typography>
            </ChildrenLoading>
            <ChildrenLoading isLoading={loading}>
              <Typography variant="subtitle1" fontWeight="bolder">
                {status || statusPtBr(userProfile?.status).toUpperCase()}
              </Typography>
            </ChildrenLoading>
          </Box>
        </Box>
        <Box mb={2} component={Paper}>
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={1}
          >
            <Typography
              component="div"
              variant="body1"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <AccountBox />
              Meu Cadastro
            </Typography>
          </Box>
          <Divider />
          <Box display="flex" flexDirection="column" gap={1} p={1} px={2}>
            <Typography
              component="div"
              display="flex"
              gap={1}
              fontWeight="bolder"
              variant="body2"
            >
              Nome:{' '}
              <ChildrenLoading isLoading={loading}>
                <Typography variant="subtitle2">{userProfile?.name}</Typography>
              </ChildrenLoading>
            </Typography>
            <Typography
              component="div"
              display="flex"
              gap={1}
              fontWeight="bolder"
              variant="body2"
            >
              CPF:{' '}
              <ChildrenLoading width={100} isLoading={loading}>
                <Typography variant="subtitle2">{userProfile?.cpf}</Typography>
              </ChildrenLoading>
            </Typography>
            <Typography
              component="div"
              display="flex"
              gap={1}
              fontWeight="bolder"
              variant="body2"
            >
              E-mail:{' '}
              <ChildrenLoading isLoading={loading}>
                <Typography variant="subtitle2" noWrap>
                  {userProfile?.email}
                </Typography>
              </ChildrenLoading>
            </Typography>
          </Box>
        </Box>
      </Grid>
      <DialogEditProfile />
      <DialogEditPassword />
    </>
  )
}

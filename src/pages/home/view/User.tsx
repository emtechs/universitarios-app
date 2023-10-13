import { useEffect, useState } from 'react'
import { Box, Divider, Grid, Paper, Typography } from '@mui/material'
import { AccountBox, Today } from '@mui/icons-material'
import {
  ChildrenLoading,
  DialogEditPassword,
  DialogEditProfile,
  apiUser,
  iPeriod,
  iUser,
  statusPtBr,
} from '../../../shared'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'
dayjs.extend(localizedFormat)

export const User = () => {
  const [userData, setUserData] = useState<iUser>()
  const [periodData, setPeriodData] = useState<iPeriod>()
  const [loading, setLoading] = useState(false)

  const getUser = () => {
    setLoading(true)
    apiUser
      .page(`?date=${dayjs().format('DD/MM/YYYY')}`)
      .then((res) => {
        setUserData(res.user)
        setPeriodData(res.period)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <>
      <Grid item xs={12} md={3}>
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
                {statusPtBr(userData?.status).toUpperCase()}
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
                <Typography variant="subtitle2">{userData?.name}</Typography>
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
                <Typography variant="subtitle2">{userData?.cpf}</Typography>
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
                  {userData?.email}
                </Typography>
              </ChildrenLoading>
            </Typography>
          </Box>
        </Box>
      </Grid>
      {userData && <DialogEditProfile user={userData} getData={getUser} />}
      {userData && <DialogEditPassword user={userData} />}
    </>
  )
}

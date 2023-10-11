import sortArray from 'sort-array'
import { useMemo } from 'react'
import { TableRow, TableCell } from '@mui/material'
import {
  TableBase,
  iHeadCell,
  iRecord,
  statusPtBr,
  useParamsContext,
} from '../../../shared'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('pt-br')
dayjs.extend(relativeTime)

interface iViewRequestPageProps {
  listData: iRecord[]
}

export const ViewRequestPage = ({ listData }: iViewRequestPageProps) => {
  const { order, by } = useParamsContext()

  const data = useMemo(() => {
    let listReq: iRecord[]

    if (order === 'user_name')
      listReq = sortArray<iRecord>(listData, {
        by: order,
        order: by,
        computed: { user_name: (row) => row.user.name },
      })

    if (order === 'user_cpf')
      listReq = sortArray<iRecord>(listData, {
        by: order,
        order: by,
        computed: { user_cpf: (row) => row.user.cpf },
      })

    listReq = sortArray<iRecord>(listData, {
      by: order,
      order: by,
    })

    return listReq
  }, [by, listData, order])

  const headCells: iHeadCell[] = [
    { order: 'created_at', numeric: 'left', label: 'Solicitado' },
    { order: 'user_name', numeric: 'left', label: 'Nome Completo' },
    { order: 'user_cpf', numeric: 'left', label: 'CPF' },
    { order: 'status', numeric: 'left', label: 'Estado' },
  ]

  return (
    <TableBase headCells={headCells}>
      {data.map((el) => (
        <TableRow key={el.key} hover>
          <TableCell>{dayjs(el.created_at).fromNow()}</TableCell>
          <TableCell>{el.user.name}</TableCell>
          <TableCell>{el.user.cpf}</TableCell>
          <TableCell>{statusPtBr(el.status)}</TableCell>
        </TableRow>
      ))}
    </TableBase>
  )
}

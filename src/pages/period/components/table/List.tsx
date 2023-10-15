import sortArray from 'sort-array'
import { useMemo } from 'react'
import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material'
import { Edit } from '@mui/icons-material'
import {
  iPeriod,
  iHeadCell,
  TableBase,
  TableCellDataLoading,
  useParamsContext,
  useDialogContext,
} from '../../../../shared'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import utc from 'dayjs/plugin/utc'
dayjs.locale('pt-br')
dayjs.extend(utc)

interface iTablePeriodPageProps {
  listData: iPeriod[]
  handlePeriod: (newPeriod: iPeriod) => void
}

export const TablePeriodPage = ({
  listData,
  handlePeriod,
}: iTablePeriodPageProps) => {
  const { order, by, isLoading } = useParamsContext()
  const { handleOpenEdit } = useDialogContext()

  const data = useMemo(() => {
    return sortArray<iPeriod>(listData, { by: order, order: by })
  }, [by, listData, order])

  const headCells: iHeadCell[] = [
    { order: 'name', numeric: 'left', label: 'Nome' },
    { order: 'date_initial', numeric: 'left', label: 'Início' },
    { order: 'date_final', numeric: 'left', label: 'Fim' },
    { numeric: 'left', label: 'Ações' },
  ]

  return (
    <TableBase headCells={headCells} message="Nenhum período encotrado">
      {data.map((el) => {
        const handleData = () => {
          handlePeriod(el)
          handleOpenEdit()
        }

        return (
          <TableRow key={el.id}>
            <TableCellDataLoading loading={isLoading}>
              {el.name}
            </TableCellDataLoading>
            <TableCellDataLoading loading={isLoading}>
              {dayjs(el.date_initial).utc().format('L')}
            </TableCellDataLoading>
            <TableCellDataLoading loading={isLoading}>
              {dayjs(el.date_final).utc().format('L')}
            </TableCellDataLoading>
            <TableCell>
              <Tooltip title="Editar">
                <IconButton color="success" size="small" onClick={handleData}>
                  <Edit fontSize="small" />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        )
      })}
    </TableBase>
  )
}

import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Tooltip,
  Typography,
} from '@mui/material'
import {
  useAppThemeContext,
  BaseContentChildren,
  DialogBaseChildren,
  SelectLine,
  lineCreateSchema,
  apiRecord,
  iLineRequest,
  iLine,
  shiftPtBr,
  DialogBase,
} from '../../../shared'
import { useState } from 'react'
import { FormContainer, SelectElement } from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'

interface iCardLineProps {
  record_id: string
  line?: iLine
  is_back?: boolean
  getLine: () => void
}

export const CardLine = ({
  record_id,
  is_back,
  line,
  getLine,
}: iCardLineProps) => {
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const [open, setOpen] = useState(false)

  const onClose = () => setOpen((old) => !old)

  const createLine = async (data: iLineRequest) => {
    try {
      onClose()
      setLoading(true)
      await apiRecord.createLine(record_id, data)
      handleSucess('Você foi alocado com sucesso na rota!')
      getLine()
    } catch {
      handleError(
        'No momento, não foi possível alocar você na rota. Por favor, tente novamente mais tarde.',
      )
    } finally {
      setLoading(false)
    }
  }

  const deleteLine = async () => {
    try {
      onClose()
      setLoading(true)
      if (line) await apiRecord.deleteLine(record_id, line.id)
      handleSucess('Você foi removido com sucesso da rota!')
      getLine()
    } catch {
      handleError(
        'No momento, não foi possível remover você da rota. Por favor, tente novamente mais tarde.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Card>
        {line ? (
          <Tooltip
            title={is_back ? 'Informar que não volta' : 'Informar que não vai'}
          >
            <CardActionArea onClick={onClose}>
              <CardContent>
                <Typography textAlign="center" fontWeight="bolder">
                  {line.route.name} - {shiftPtBr(line.shift)} -{' '}
                  {line.week.name.toUpperCase()}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Tooltip>
        ) : (
          <Tooltip title="Adicionar">
            <CardActionArea onClick={onClose}>
              <CardContent>
                <Typography textAlign="center">
                  {is_back ? 'NÃO VOLTA' : 'NÃO VAI'}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Tooltip>
        )}
      </Card>
      {line ? (
        <DialogBase
          open={open}
          onClose={onClose}
          title={is_back ? 'Informar que não volta' : 'Informar que não vai'}
          description={`Você está prestes a sair da rota ${
            line.route.name
          } - ${shiftPtBr(line.shift)} -
          ${line.week.name.toUpperCase()} . Se deseja prosseguir, clique em 'Continuar'.`}
          actionTitle="Continuar"
          action={deleteLine}
        />
      ) : (
        <DialogBaseChildren
          open={open}
          onClose={onClose}
          title={is_back ? 'Alterar Volta' : 'Alterar Ida'}
          description=""
        >
          <FormContainer
            onSuccess={createLine}
            resolver={zodResolver(lineCreateSchema)}
          >
            <BaseContentChildren>
              <SelectElement
                label="Turno"
                name="shift"
                options={[
                  {
                    id: 'MORNING',
                    label: 'MATUTINO',
                  },
                  {
                    id: 'AFTERNOON',
                    label: 'VESPERTINO',
                  },
                  {
                    id: 'NIGHT',
                    label: 'NOTURNO',
                  },
                ]}
                required
              />
              <SelectLine is_back={is_back} />
              <Button variant="contained" type="submit" fullWidth>
                Salvar
              </Button>
            </BaseContentChildren>
          </FormContainer>
        </DialogBaseChildren>
      )}
    </>
  )
}

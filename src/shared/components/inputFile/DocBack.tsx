import { useFormContext } from 'react-hook-form-mui'

interface iInputFileProps {
  label: string
}

interface iInputFileRequest {
  verso: File | null
}

export const InputDockBackFile = ({ label }: iInputFileProps) => {
  const { register, formState } = useFormContext<iInputFileRequest>()

  const { errors } = formState

  const data_errors = !!errors.verso

  return (
    <div>
      <div
        data-errors={data_errors}
        className="flex flex-col gap-2 border border-neutral-300 hover:border-neutral-700 transition-colors rounded-[4px] px-[14px] pt-3 pb-[16.5px] text-neutral-500 hover:cursor-pointer data-[errors=true]:border-red-600 data-[errors=true]:first:text-red-600 data-[errors=true]:hover:border-red-600"
      >
        <label htmlFor="verso" className="text-sm hover:cursor-pointer">
          {label} *
        </label>
        <input
          id="verso"
          type="file"
          required
          accept="image/jpeg, image/jpg, image/png, image/webp"
          className="text-sm cursor-pointer file:bg-primary file:hover:bg-blue-900 file:transition-colors file:uppercase file:text-xs file:p-[6px]  file:text-white file:shadow file:rounded file:border-none file:cursor-pointer"
          {...register('verso')}
        />
      </div>
      {errors.verso && (
        <span className="text-red-600 text-xs ml-[14px]">
          {errors.verso.message}
        </span>
      )}
    </div>
  )
}

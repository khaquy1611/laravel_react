import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CustomInputProps } from '@/types/Base'

const CustomInput = ({
  label,
  name,
  type,
  register,
  errors,
  defaultValue,
}: CustomInputProps) => {
  return (
    <>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={name} className="text-right">
          {label}
        </Label>
        <Input
          name={name}
          type={type ?? 'text'}
          id={name}
          className="col-span-3"
          {...register(name)}
          defaultValue={defaultValue || ''}
        />
      </div>
      <div className="error-line text-right mt-[-10px]">
        {errors[name] && (
          <span className="text-red-500 text-xs">{errors[name].message}</span>
        )}
      </div>
    </>
  )
}

export default CustomInput

import { InputProps } from '@/types/Base'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const CustomInput = ({ label, id, type }: InputProps) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={id} className="text-right text-[#f00]">
        {label}
      </Label>
      <Input type={type ?? 'text'} id={id} className="col-span-3" />
    </div>
  )
}

export default CustomInput

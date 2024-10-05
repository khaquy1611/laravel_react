/* eslint-disable react-refresh/only-export-components */
import { memo } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

import { useFormContext } from 'react-hook-form'
import { CustomInputProps } from '@/types/Base'

const CustomTextarea = ({
  label,
  name,
  defaultValue,
  className,
  ...restProps
}: CustomInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const errorMessage = errors[name]?.message

  return (
    <>
      {restProps.required}
      <div className={className ?? 'grid grid-cols-4 items-center gap-4'}>
        <Label
          htmlFor={name}
          className={restProps.labelClassName ?? 'text-right'}
        >
          {label}
          {restProps.required == true ? (
            <span className="text-[#f00] ml-[5px] text-[12px]">(*)</span>
          ) : null}
        </Label>
        <Textarea
          id={name}
          className={` 
                        ${restProps.inputClassName ?? null} 
                        col-span-3 
                        focus-visible:ring-0
                        focus:outline-none focus:ring-2 focus:border-sky-500
                        
                    `}
          {...register(name)}
          {...(restProps.onChange ? { onChange: restProps.onChange } : {})}
          defaultValue={defaultValue || ''}
        />
      </div>
      <div className="error-line text-right">
        {typeof errorMessage === 'string' && (
          <span className="text-red-500 text-xs">{errorMessage}</span>
        )}
      </div>
    </>
  )
}

export default memo(CustomTextarea)

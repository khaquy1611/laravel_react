/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Label } from '@/components/ui/label'
import Select from 'react-select'
import { Controller } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { CustomSelectBoxProps } from '@/types/Base'

const CustomSelectBox = React.memo(
  ({
    title,
    placeholder,
    options = [],
    onSelectChange,
    isLoading,
    name,
    control,
    errors,
    value,
  }: CustomSelectBoxProps) => {
    const [, setSelectedValue] = useState<any>(value)

    useEffect(() => {
      if (value) {
        setSelectedValue(value)
        if (onSelectChange) {
          onSelectChange(value.value)
        }
      }
    }, [value])

    return (
      <>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="image" className="text-right">
            {' '}
            {title}
          </Label>

          <Controller
            name={name}
            control={control}
            // {...register(name)}
            render={({ field }) => (
              <Select
                // {...field }
                options={isLoading ? [] : options}
                className="w-[320px]"
                placeholder={placeholder ?? ''}
                onChange={selected => {
                  setSelectedValue(selected)
                  field.onChange(selected?.value)
                  if (onSelectChange) {
                    onSelectChange(selected?.value)
                  }
                }}
                value={
                  options.find(option => option.value === field.value) || null
                }
                isLoading={isLoading}
                // ref={field.ref}
              />
            )}
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
)

export default CustomSelectBox

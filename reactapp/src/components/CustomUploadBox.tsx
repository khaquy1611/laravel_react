/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from 'react'
import UploadIcon from '@/assets/upload-image.jpg'
import { FieldValues, useFormContext } from 'react-hook-form'
import useUpload from '@/hooks/useUpload'

interface ICustomUploadBoxProps<T extends FieldValues> {
  label: string
  name: string
  data?: string
}
const CustomUploadBox = <T extends FieldValues>({
  label,
  name,
  data,
}: ICustomUploadBoxProps<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const { images, handleImageChange } = useUpload(false)
  const errorMessage = errors[name]?.message

  return (
    <div>
      <div className="flex flex-col items-center bg-gray-100 p-4 rounded-md shadow-inner">
        <label
          htmlFor={name}
          className="size-25 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer overflow-hidden relative"
        >
          <input
            type="file"
            id={name}
            className="opacity-0 size-full absolute inset-0 cursor-pointer"
            {...register(name as any, {
              onChange: handleImageChange,
            })}
          />

          {images.length > 0 ? (
            <img src={images[0].preview} alt="" />
          ) : data && data.length ? (
            <img src={data} alt="" />
          ) : (
            <img src={UploadIcon} alt="" />
          )}
        </label>
        <span className="text-gray-700 font-medium text-[13px] mt-[5px]">
          {label}
        </span>
      </div>
      <div className="error-line text-right">
        {typeof errorMessage === 'string' && (
          <span className="text-red-500 text-xs">{errorMessage}</span>
        )}
      </div>
    </div>
  )
}

export default memo(CustomUploadBox)

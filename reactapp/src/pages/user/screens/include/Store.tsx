/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from 'react'
/* COMPONENTS */
import CustomInput from '@/components/CustomInput'
import CustomSelectBox from '@/components/CustomSelectBox'
import LoadingButton from '@/components/LoadingButton'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
/* HOOKS */
import useFormSubmit from '@/hooks/useFormSubmit'
import useLocationState from '@/hooks/useLocationState'
import useSelectBox from '@/hooks/useSelectBox'
import useUpload from '@/hooks/useUpload'
import { FormProvider, useForm } from 'react-hook-form'
import { useQuery } from 'react-query'

/* SETTINGS */

import { formField } from '@/pages/user/settings/userSettings'

import { Option } from '@/types/Base'
import { StoreProps } from '@/types/Base'
import { UserPayloadInput, UserType } from '@/types/User'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

/* SERVICE */
import { getUserById, save } from '@/services/UserServices'

export interface SelectBoxItem {
  title: string | undefined
  placeholder: string | undefined
  options: Option[]
  value: Option | null
  name: string
  control: any
  onSelectChange?: (value: string | undefined) => void
  isLoading?: boolean
}

interface UserStoreProps extends StoreProps {
  userCatalogueData: { value: string; label: string }[]
}

const UserStore = ({
  id,
  action,
  refetch,
  closeSheet,
  userCatalogueData,
}: UserStoreProps) => {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Bạn chưa nhập vào Họ Tên')
      .min(3, 'Tên người dùng tối thiểu phải có 3 ký tự'),
    email: yup
      .string()
      .required('Bạn chưa nhập vào Email')
      .email('Email không hợp lệ'),
    phone: yup.string().required('Bạn chưa nhập vào số điện thoại'),
    password: yup.string().when('$action', {
      is: 'update',
      then: schema => schema.notRequired(),
      otherwise: schema =>
        schema
          .required('Bạn chưa nhập vào ô mật khẩu')
          .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    }),
    confirmPassword: yup.string().when('$action', {
      is: 'update',
      then: schema => schema.notRequired(),
      otherwise: schema =>
        schema
          .required('Bạn chưa nhập vào ô xác nhân mật khẩu')
          .oneOf([yup.ref('password')], 'Mật khẩu nhập lại không chính xác'),
    }),
    user_catalogue_id: yup.string().required('Bạn chưa chọn nhóm thành viên'),
    province_id: yup.string().required('Bạn chưa chọn thành phố'),
    district_id: yup.string().required('Bạn chưa chọn quận / huyện'),
    ward_id: yup.string().required('Bạn chưa chọn phường / xã'),
    address: yup.string().optional(),
    image: yup.mixed().optional(),
  })

  const [defaultSelectValue] = useState<Option | null>(null)

  const methods = useForm<UserPayloadInput>({
    context: { action },
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  })
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = methods

  const {
    provinces,
    districts,
    wards,
    setProvinceId,
    setDistrictId,
    isDistrictLoading,
    isWardLoading,
  } = useLocationState()
  const { images, handleImageChange } = useUpload(false)

  const { onSubmitHanler, loading } = useFormSubmit(
    save,
    { action: action, id: id },
    null,
    refetch,
    closeSheet
  )

  const { data, isLoading } = useQuery<UserType>(
    ['user', id],
    () => getUserById(id),
    {
      enabled: action === 'update' && !!id,
    }
  )

  const [validationRules, setValidationRules] = useState(() =>
    formField(action, undefined)
  )

  useEffect(() => {
    if (!isLoading && data && action === 'update') {
      setValidationRules(formField(action, data))
      Object.keys(data).forEach(key => {
        const value = data[key as keyof UserType]
        if (typeof value === 'string' || value === undefined) {
          setValue(key as keyof UserPayloadInput, value)
        } else {
          setValue(key as keyof UserPayloadInput, String(value))
        }
      })
    }
  }, [action, data, isLoading, setValue])

  const initialSelectBoxs = useMemo<SelectBoxItem[]>(
    () => [
      {
        title: 'Nhóm User',
        placeholder: 'Chọn Nhóm Thành Viên',
        options: userCatalogueData,
        value: defaultSelectValue,
        name: 'user_catalogue_id',
        control: control,
      },
      {
        title: 'Thành Phố',
        placeholder: 'Chọn Thành Phố',
        options: [],
        value: defaultSelectValue,
        onSelectChange: (value: string | undefined) => {
          setProvinceId(value)
        },
        name: 'province_id',
        control: control,
      },
      {
        title: 'Quận/Huyện',
        placeholder: 'Chọn Quận/Huyện',
        options: [],
        value: defaultSelectValue,
        onSelectChange: (value: string | undefined) => setDistrictId(value),
        isLoading: isDistrictLoading,
        name: 'district_id',
        control: control,
      },
      {
        title: 'Phường Xã',
        placeholder: 'Chọn Phường Xã',
        options: [],
        value: defaultSelectValue,
        isLoading: isWardLoading,
        name: 'ward_id',
        control: control,
      },
    ],
    [defaultSelectValue, setProvinceId, setDistrictId, control]
  )

  const { selectBox, updateSelecBoxValue, updateSelectBoxOptions } =
    useSelectBox(initialSelectBoxs)

  useEffect(() => {
    if (userCatalogueData) {
      updateSelectBoxOptions('user_catalogue_id', userCatalogueData)
      if (data) {
        updateSelecBoxValue(
          'user_catalogue_id',
          userCatalogueData,
          String(data?.user_catalogue_id)
        )
      }
    }
  }, [userCatalogueData, data, updateSelecBoxValue, updateSelectBoxOptions])

  useEffect(() => {
    if (provinces.data && provinces.data.length) {
      updateSelectBoxOptions('province_id', provinces.data)
      if (data) {
        updateSelecBoxValue(
          'province_id',
          provinces.data,
          String(data?.province_id)
        )
      }
    }
  }, [provinces.data, data, updateSelecBoxValue, updateSelectBoxOptions])

  useEffect(() => {
    if (districts.data && districts.data.length) {
      updateSelectBoxOptions('district_id', districts.data)
      if (data) {
        updateSelecBoxValue(
          'district_id',
          districts.data,
          String(data?.district_id)
        )
      }
    }
  }, [districts.data, updateSelecBoxValue, updateSelectBoxOptions, data])

  useEffect(() => {
    if (wards.data && wards.data.length) {
      updateSelectBoxOptions('ward_id', wards.data)
      if (data) {
        updateSelecBoxValue('ward_id', wards.data, String(data?.ward_id))
      }
    }
  }, [wards.data, data, updateSelecBoxValue, updateSelectBoxOptions])

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHanler)}>
        <div className="grid gap-4 py-4">
          {validationRules &&
            validationRules.map((item, index) => (
              <CustomInput key={index} {...item} />
            ))}

          {selectBox &&
            selectBox.map((item, index) => (
              <CustomSelectBox
                key={index}
                {...item}
                register={register}
                errors={errors}
              />
            ))}
          <CustomInput
            label="Địa chỉ"
            name="address"
            type="text"
            defaultValue={data && data.address}
          />

          <input
            type="file"
            accept="image/"
            id="upload-image"
            className="hidden"
            {...register('image', {
              onChange: handleImageChange,
            })}
          />
          <div className="text-center">
            <label htmlFor="upload-image">
              <Avatar className="size-[100px] inline-block cursor-pointer shadow-md border">
                {images.length > 0 ? (
                  <AvatarImage
                    className="object-cover"
                    src={images[0].preview}
                  />
                ) : data && data.image ? (
                  <AvatarImage className="object-cover" src={data.image} />
                ) : (
                  <AvatarImage
                    className="object-cover"
                    src="https://github.com/shadcn.png"
                  />
                )}
              </Avatar>
            </label>
          </div>
        </div>
        <div className="text-right">
          <LoadingButton loading={loading} text="Lưu thông tin" />
        </div>
      </form>
    </FormProvider>
  )
}

export default UserStore

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useMemo, Key } from 'react'
/* COMPONENTS */
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import CustomSelectBox from '@/components/CustomSelectBox'
import CustomInput from '@/components/CustomInput'
import LoadingButton from '@/components/LoadingButton'
/* HOOKS */
import { useForm } from 'react-hook-form'
import useLocationState from '@/hooks/useLocationState'
import useUpload from '@/hooks/useUpload'
import useFormSubmit from '@/hooks/useFormSubmit'
import { useQuery } from 'react-query'
import useSelectBox from '@/hooks/useSelectBox'

/* SETTINGS */

import { formField } from '@/pages/user/settings/userSettings'

import { UserPayloadInput, UserType } from '@/types/User'
import { SelectBoxItem, StoreProps } from '@/types/Base'
import { Option } from '@/types/Base'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// import { schema } from "../../validations/user"
/* SERVICE */
import { save, getUserById } from '@/services/UserServices'

const UserStore = ({ id, action, refetch, closeSheet }: StoreProps) => {
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<UserPayloadInput>({
    context: { action },
    resolver: yupResolver(schema),
  })
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

  const { onSubmitHanler, loading } = useFormSubmit(save, refetch, closeSheet, {
    action: action,
    id: id,
  })

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
  }, [data])

  const [userCatalogues] = useState([{ value: '1', label: 'Super Admin' }])

  const [defaultSelectValue] = useState<Option | null>(null)

  const initialSelectBoxs = useMemo<SelectBoxItem[]>(
    () => [
      {
        title: 'Nhóm User',
        placeholder: 'Chọn Nhóm Thành Viên',
        options: userCatalogues,
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
    [
      userCatalogues,
      defaultSelectValue,
      control,
      isDistrictLoading,
      isWardLoading,
      setProvinceId,
      setDistrictId,
    ]
  )

  const { selectBox, updateSelecBoxValue, updateSelectBoxOptions } =
    useSelectBox(initialSelectBoxs)

  useEffect(() => {
    if (data) {
      updateSelecBoxValue(
        'user_catalogue_id',
        userCatalogues,
        String(data?.user_catalogue_id)
      )
    }
  }, [userCatalogues, data, updateSelecBoxValue, updateSelectBoxOptions])

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
    <form onSubmit={handleSubmit(onSubmitHanler)}>
      <div className="grid gap-4 py-4">
        {validationRules &&
          validationRules.map((item: any, index: Key | null | undefined) => (
            <CustomInput
              key={index}
              register={register}
              errors={errors}
              {...item}
            />
          ))}

        {selectBox &&
          selectBox.map((item: any, index) => (
            <CustomSelectBox
              key={index}
              {...item}
              register={register}
              errors={errors}
            />
          ))}
        <CustomInput
          register={register}
          errors={errors}
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
                <AvatarImage className="object-cover" src={images[0].preview} />
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
  )
}

export default UserStore

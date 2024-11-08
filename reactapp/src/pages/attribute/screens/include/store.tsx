/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, useMemo } from 'react'
/* COMPONENTS */
import CustomInput from '@/components/CustomInput'
import LoadingButton from '@/components/LoadingButton'
import CustomSelectBox from '@/components/CustomSelectBox'
/* HOOKS */
import useFormSubmit from '@/hooks/useFormSubmit'
import useSetFormValue from '@/hooks/useSetFormValue'
import { FormProvider, useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import useSelectBox from '@/hooks/useSelectBox'

/* SETTINGS */

import { SelectBoxItem, StoreProps, Option } from '@/types/Base'
import { Attribute as IObject } from '@/types/Attribute'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

/* SERVICE */
import { findById, save } from '@/services/AttributeService'

export interface AttributeStoreProps extends StoreProps {
  attributeCatalogues: { value: string; label: string }[]
}

interface AttributeStoreInput {
  name: string
  canonical: string
  attribute_catalogue_id: number
  refetch?: () => object
  attributeCatalogues?: { value: string; label: string }[]
}

const AttributeStore = ({
  id,
  action,
  closeSheet,
  attributeCatalogues,
}: AttributeStoreProps) => {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Bạn chưa nhập vào tên thuộc tính')
      .min(3, 'Tên thuộc tính dùng tối thiểu phải có 3 ký tự'),
    canonical: yup.string().required('Bạn chưa nhập vào đường dẫn thuộc tính'),
    attribute_catalogue_id: yup
      .number()
      .required('Bạn chưa chọn nhóm thuộc tính'),
  })

  const methods = useForm<AttributeStoreInput>({
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

  const { onSubmitHanler, loading } = useFormSubmit(
    save,
    { action: action, id: id },
    null,
    'attributes',
    closeSheet
  )

  const { data, isLoading } = useQuery<IObject>(
    ['attribute_catalogue', id],
    () => findById(id),
    {
      enabled: action === 'update' && !!id,
    }
  )

  const [defaultSelectValue, _] = useState<Option | null>(null)
  const initialSelectBoxs = useMemo<SelectBoxItem[]>(
    () => [
      {
        title: 'Nhóm',
        placeholder: 'Loại thuộc tính',
        options: attributeCatalogues,
        value: defaultSelectValue,
        name: 'attribute_catalogue_id',
        control: control,
      },
    ],
    [defaultSelectValue, control]
  )
  const { selectBox } = useSelectBox(initialSelectBoxs)

  useSetFormValue({ isLoading, data, action, setValue })

  useEffect(() => {
    console.log(errors)
  }, [errors])

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHanler)}>
        <div className="grid gap-4 py-4">
          <CustomInput
            register={register}
            errors={errors}
            label="Thuộc Tính"
            name="name"
            type="text"
            defaultValue={data && data.name}
          />
          <CustomInput
            register={register}
            errors={errors}
            label="Đường dẫn"
            name="canonical"
            type="text"
            defaultValue={data && data.model}
          />
          {selectBox &&
            selectBox.map((item, index) => (
              <CustomSelectBox
                key={index}
                {...item}
                register={register}
                errors={errors}
              />
            ))}
        </div>
        <div className="text-right">
          <LoadingButton loading={loading} text="Lưu thông tin" />
        </div>
      </form>
    </FormProvider>
  )
}

export default AttributeStore

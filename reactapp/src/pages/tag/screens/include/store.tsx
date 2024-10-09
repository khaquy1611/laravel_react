/* COMPONENTS */
import CustomInput from '@/components/CustomInput'
import LoadingButton from '@/components/LoadingButton'
/* HOOKS */
import useFormSubmit from '@/hooks/useFormSubmit'
import useSetFormValue from '@/hooks/useSetFormValue'
import { FormProvider, useForm } from 'react-hook-form'
import { useQuery } from 'react-query'

/* SETTINGS */
import { TTagPayloadInput } from '@/types/Tags'
import { StoreProps } from '@/types/Base'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

/* SERVICE */
import { getTagById, save, ITag } from '@/services/TagService'

/* INTERFACE */

const Store = ({ id, action, closeSheet }: StoreProps) => {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Bạn chưa nhập vào tên tag')
      .min(3, 'Tên tag dùng tối thiểu phải có 3 ký tự'),
    canonical: yup.string().required('Bạn chưa nhập vào đường dẫn cho tag'),
  })

  const methods = useForm<TTagPayloadInput>({
    context: { action },
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = methods

  const { onSubmitHanler, loading } = useFormSubmit(
    save,
    { action: action, id: id },
    null,
    'tags',
    closeSheet
  )

  const { data, isLoading } = useQuery<ITag>(
    ['tag', id],
    () => getTagById(id),
    {
      enabled: action === 'update' && !!id,
    }
  )

  useSetFormValue({ isLoading, data, action, setValue })

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHanler)}>
        <div className="grid gap-4 py-4">
          <CustomInput
            register={register}
            errors={errors}
            label="Tên Tag"
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
            defaultValue={data && data.description}
          />
        </div>
        <div className="text-right">
          <LoadingButton loading={loading} text="Lưu thông tin" />
        </div>
      </form>
    </FormProvider>
  )
}

export default Store

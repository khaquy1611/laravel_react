/* COMPONENTS */
import CustomInput from '@/components/CustomInput'
import LoadingButton from '@/components/LoadingButton'
/* HOOKS */
import { useForm, FormProvider } from 'react-hook-form'
import useFormSubmit from '@/hooks/useFormSubmit'
import { useQuery } from 'react-query'
import useSetFormValue from '@/hooks/useSetFormValue'

/* SETTINGS */
import { UserCataloguesType } from '@/types/UserCatalogues'
import { StoreProps } from '@/types/Base'
import { UserCataloguePayloadInput } from '@/types/UserCatalogues'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

/* SERVICE */
import { save, getUserCatalogueById } from '@/services/UserCataloguesServices'

const UserCatalogueStore = ({
  id,
  action,
  refetch,
  closeSheet,
}: StoreProps) => {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Bạn chưa nhập vào tên nhóm thành viên')
      .min(3, 'Tên nhóm thành viên dùng tối thiểu phải có 3 ký tự'),
    description: yup.string().optional(),
  })

  const methods = useForm<UserCataloguePayloadInput>({
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
    refetch,
    closeSheet
  )

  const { data, isLoading } = useQuery<UserCataloguesType>(
    ['user_catalogue', id],
    () => getUserCatalogueById(id),
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
            label="Tên Nhóm"
            name="name"
            type="text"
            defaultValue={data && data.name}
          />
          <CustomInput
            register={register}
            errors={errors}
            label="Mô tả"
            name="description"
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

export default UserCatalogueStore
import { memo, useEffect } from 'react'
import CustomInput from './CustomInput'
import LoadingButton from './LoadingButton'
import { FormProvider, useForm } from 'react-hook-form'
import useFormSubmit from '@/hooks/useFormSubmit'
import { save } from '@/services/TagService'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export type TTag = {
  name: string
  canonical: string
}

export interface ICreateTag {
  close: () => void
  onNewTag: (tag: { value: string; label: string }) => void
}

const schema = yup.object().shape({
  name: yup.string().required('Bạn chưa nhập vào tên tag'),
  canonical: yup.string().required('Bạn chưa nhập vào đường dẫn'),
})

const CreateTag = ({ close, onNewTag }: ICreateTag) => {
  const methods = useForm<TTag>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  })
  const { handleSubmit } = methods
  const { onSubmitHanler, loading, isSuccess, data } = useFormSubmit(save, {
    action: '',
    id: '',
  })

  useEffect(() => {
    if (isSuccess && data) {
      onNewTag({
        value: data.tag.id,
        label: String(data.tag.name),
      })

      close()
    }
  }, [isSuccess, data])

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHanler)}>
        <div className="grid gap-[10px] py-4">
          <CustomInput
            label="Tiêu đề"
            name="name"
            type="text"
            defaultValue=""
            labelClassName="mb-[10px] block"
            inputClassName="border-[#ccced1]"
            required={true}
          />

          <CustomInput
            label="Link"
            name="canonical"
            type="text"
            defaultValue=""
            labelClassName="mb-[10px] block"
            inputClassName="border-[#ccced1]"
            required={true}
          />

          <LoadingButton loading={loading} text="Thực hiện" />
        </div>
      </form>
    </FormProvider>
  )
}

export default memo(CreateTag)

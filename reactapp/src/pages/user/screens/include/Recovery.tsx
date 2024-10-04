/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { useState } from 'react'

/* COMPONENT */
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form'
import LoadingButton from '@/components/LoadingButton'
import CustomInput from '@/components/CustomInput'

/* HELPERS */
import { showToast } from '@/helpers/myHelper'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

type Inputs = {
  password: string
  confirmPassword: string
}

interface RecoveryProps {
  id: string
  callback: Function
  [key: string]: any
}

const Recovery = ({ id, callback, ...restProps }: RecoveryProps) => {
  const schema = yup.object().shape({
    password: yup
      .string()
      .required('Bạn chưa nhập vào ô mật khẩu')
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    confirmPassword: yup
      .string()
      .required('Bạn chưa nhập vào ô xác nhân mật khẩu')
      .oneOf([yup.ref('password')], 'Mật khẩu nhập lại không chính xác'),
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const methods = useForm<Inputs>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  })

  const closeDialog = () => {
    restProps.close()
  }

  const changePasswordHanler: SubmitHandler<Inputs> = async payload => {
    setIsLoading(true)
    try {
      const res = await callback(id, payload)
      if (res.code === 200) {
        showToast(res.message, res.code === 200 ? 'success' : 'error')
        closeDialog()
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(changePasswordHanler)}>
        <div className="grid gap-[10px] py-4">
          <CustomInput
            label="MK mới"
            name="password"
            type="password"
            defaultValue=""
          />
          <CustomInput
            label="Nhập lại"
            name="confirmPassword"
            type="password"
            defaultValue=""
          />
          <LoadingButton loading={isLoading} text="Thực hiện" />
        </div>
      </form>
    </FormProvider>
  )
}

export default Recovery

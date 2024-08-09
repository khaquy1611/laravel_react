/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'

/* COMPONENT */
import { useForm, SubmitHandler } from 'react-hook-form'
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
  callback: any
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  })

  const changePasswordHanler: SubmitHandler<Inputs> = async payload => {
    console.log(payload)

    setIsLoading(true)
    try {
      const res = await callback(id, payload)
      if (res.code === 200) {
        showToast(res.message, res.code === 200 ? 'success' : 'error')
        restProps.close()
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(changePasswordHanler)}>
      <div className="grid gap-[10px] py-4">
        <CustomInput
          register={register}
          errors={errors}
          label="MK mới"
          name="password"
          type="password"
          defaultValue=""
        />
        <CustomInput
          register={register}
          errors={errors}
          label="Nhập lại"
          name="confirmPassword"
          type="password"
          defaultValue=""
        />
        <LoadingButton loading={isLoading} text="Thực hiện" />
      </div>
    </form>
  )
}

export default Recovery

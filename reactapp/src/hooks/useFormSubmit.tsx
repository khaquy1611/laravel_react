/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, FieldValues } from 'react-hook-form'
import { useMutation } from 'react-query'
import { showToast } from '@/helpers/myHelper'

type SubmitFunction<T extends FieldValues> = (
  data: T,
  updateParams: { action: string; id: string | null }
) => Promise<void>

const useFormSubmit = <T extends FieldValues>(
  submitFn: SubmitFunction<T>,
  refetch: any,
  closeSheet: () => void,
  updateParams: { action: string; id: string | null }
) => {
  const mutation = useMutation<void, Error, T>({
    mutationFn: payload => submitFn(payload, updateParams),
    onSuccess: () => {
      closeSheet()
      showToast('Cập nhật dữ liệu liệu thành công', 'success')
      refetch()
    },
    onError: (error: any) => {
      console.error('Lỗi: ', error)
      showToast(error.response.data.message, 'error')
    },
  })

  const onSubmitHanler: SubmitHandler<T> = async payload => {
    mutation.mutate(payload)
  }

  return {
    onSubmitHanler,
    success: mutation.isSuccess,
    error: mutation.isError,
    loading: mutation.isLoading,
  }
}

export default useFormSubmit

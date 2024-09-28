/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react'
import { useMutation } from 'react-query'
import { showToast } from '@/helpers/myHelper'

const useDialog = (refetch: any) => {
  const [alertDialogOpen, setAlertDialogOpen] = useState<boolean>(false)
  const [currentAction, setCurrentAction] = useState<{
    id: string
    callback: Function
  } | null>(null)

  const openAlertDialog = useCallback((id: string, callback: Function) => {
    setCurrentAction({ id, callback })
    setAlertDialogOpen(true)
  }, [])
  const closeAlertDialog = useCallback(() => {
    setAlertDialogOpen(false)
  }, [])

  const mutation = useMutation({
    mutationFn: (id: string) => currentAction?.callback(currentAction.id),
    onSuccess: response => {
      closeAlertDialog()
      setCurrentAction(null)
      showToast('Cập nhật dữ liệu liệu thành công', 'success')
      refetch()
    },
    onError: (error: any) => {
      console.log(error)
    },
  })

  const confirmAction = useCallback(() => {
    if (currentAction) {
      mutation.mutate(currentAction.id)
    }
  }, [currentAction, mutation])

  return {
    alertDialogOpen,
    openAlertDialog,
    closeAlertDialog,
    confirmAction,
    setCurrentAction,
    isLoading: mutation.isLoading,
  }
}

export default useDialog

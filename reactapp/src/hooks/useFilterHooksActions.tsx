/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteAll, updateFieldByParams } from '@/services/BaseServices'
import { CheckStateInterface } from '@/types/Base'

const useFilterHooksActions = () => {
  const actionSwitch = (
    action: string,
    selectedValue: string,
    { checkedState }: CheckStateInterface,
    model: string,
    refetch: any
  ) => {
    const ids = Object.keys(checkedState).filter(
      key => checkedState[Number(key)]
    )
    let response
    switch (action) {
      case 'deleteAll':
        response = deleteAll(ids, model, refetch)
        break
      case 'publish':
        response = updateFieldByParams(
          action,
          selectedValue,
          ids,
          model,
          refetch
        )
        break
      default:
        break
    }
    return response
  }
  return { actionSwitch }
}

export default useFilterHooksActions

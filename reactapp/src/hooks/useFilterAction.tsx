/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { CheckState, CheckStateInterface } from '@/types/Base'
import { updateFieldByParams, deleteAll } from '@/services/BaseServices'

import { showToast } from '@/helpers/myHelper'

interface FilterInterface {
  perPage: string | undefined
  publish: string | undefined
  sort: string | undefined
}

const useFilterAction = (
  checkedState: CheckState,
  model: string,
  refetch: any,
  debounce: any
) => {
  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState<FilterInterface>({
    perPage: searchParams.get('perPage') || '10',
    publish: searchParams.get('publish') || undefined,
    sort: searchParams.get('sort') || undefined,
  })
  const [keyword, setKeyword] = useState<string>(
    searchParams.get('keyword') || ''
  )

  const [alertDialogOpen, setAlertDialogOpen] = useState<boolean>(false)
  const [actionSelectedValue, setActionSelectedValue] = useState<string>('')

  const actionSwitch = async (
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
        response = await deleteAll(ids, model, refetch)
        break
      case 'publish':
        response = await updateFieldByParams(
          action,
          selectedValue,
          ids,
          model,
          refetch
        )
        break
    }
    return response
  }

  const confirmAction = async (value: string): Promise<void> => {
    const [action, selectedValue] = value.split('|')
    const response = await actionSwitch(
      action,
      selectedValue,
      { checkedState },
      model,
      refetch
    )
    closeAlertDialog()
    showToast(response?.message, 'success')
  }

  const openAlertDialog = (value: string) => {
    setAlertDialogOpen(true)
    setActionSelectedValue(value)
  }
  const closeAlertDialog = () => {
    setAlertDialogOpen(false)
    setActionSelectedValue('')
  }

  const handleFilter = (value: string, field: string) => {
    setFilters(prevFilters => ({ ...prevFilters, [field]: value }))
  }

  const debounceInputSearch = debounce((value: string) => {
    setKeyword(value)
  }, 300)

  return {
    actionSwitch,
    confirmAction,
    openAlertDialog,
    closeAlertDialog,
    setFilters,
    setKeyword,
    handleFilter,
    alertDialogOpen,
    actionSelectedValue,
    filters,
    keyword,
    debounceInputSearch,
  }
}

export default useFilterAction

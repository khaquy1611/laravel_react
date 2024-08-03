/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'

const useCheckBoxState = (data: any, model: string, isLoading: boolean) => {
  const [checkedState, setCheckedState] = useState<{ [key: number]: boolean }>(
    {}
  )
  const [checkedAllState, setCheckedAllState] = useState<boolean>(false)
  const handleCheckedChange = (id: number) => {
    const updateCheckedState = { ...checkedState, [id]: !checkedState[id] }
    const allChecked = Object.values(updateCheckedState).every(value => value)
    setCheckedState(updateCheckedState)
    setCheckedAllState(allChecked)
  }

  const isAnyChecked = () => Object.values(checkedState).some(value => value)

  const handleChangeAll = () => {
    const newCheckAllState = !checkedAllState
    const updateCheckedState = Object.keys(checkedState).reduce(
      (acc: any, key: string) => {
        acc[key] = newCheckAllState
        return acc
      },
      {}
    )
    setCheckedState(updateCheckedState)
    setCheckedAllState(newCheckAllState)
  }
  useEffect(() => {
    if (!isLoading && data[model]) {
      const initialCheckBoxState = data[model].reduce((acc: any, item: any) => {
        acc[item.id] = false
        return acc
      }, {})
      setCheckedState(initialCheckBoxState)
      setCheckedAllState(false)
    }
  }, [data, isLoading, model])
  return {
    checkedState,
    checkedAllState,
    handleCheckedChange,
    handleChangeAll,
    isAnyChecked,
  }
}

export default useCheckBoxState

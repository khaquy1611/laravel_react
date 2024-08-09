/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react'
import { SelectBoxItem } from '@/types/Base'
import { Option } from '@/types/Base'

const useSelectBox = (initialSelectBoxs: SelectBoxItem[]) => {
  const [selectBox, setSelectBox] = useState<SelectBoxItem[]>(initialSelectBoxs)
  const updateSelecBoxValue = useCallback(
    (name: string, options: Option[], value: string | undefined) => {
      setSelectBox((prevSelectBox: any) =>
        prevSelectBox.map((item: { name: string }) =>
          item.name === name
            ? {
                ...item,
                value:
                  options.filter(
                    (option: Option) => option.value === value
                  )[0] || null,
              }
            : item
        )
      )
    },
    []
  )

  const updateSelectBoxOptions = useCallback(
    (name: string, newOptions: Option[]) => {
      setSelectBox((prevSelectBox: any) =>
        prevSelectBox.map((item: { name: string }) =>
          item.name === name ? { ...item, options: newOptions } : item
        )
      )
    },
    []
  )

  return { selectBox, updateSelecBoxValue, updateSelectBoxOptions }
}

export default useSelectBox

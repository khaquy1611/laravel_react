import { Sheet } from '@/types/Base'
import { useState } from 'react'

const useSheet = () => {
  const [isSheetOpen, setIsSheetOpen] = useState<Sheet>({
    open: false,
    action: '',
    id: null,
  })

  const openSheet = ({ action, id }: Sheet) => {
    setIsSheetOpen({ open: true, action, id })
  }

  const closeSheet = () => setIsSheetOpen({ ...isSheetOpen, open: false })

  return { isSheetOpen, openSheet, closeSheet }
}

export default useSheet

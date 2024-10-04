/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

interface CustomSheetProps {
  title: string | undefined
  description: string | undefined
  isSheetOpen: boolean
  closeSheet: () => void
  children: any
  className: string | undefined
}

const CustomSheet = ({
  children,
  isSheetOpen,
  closeSheet,
  title,
  className,
  description,
}: CustomSheetProps) => {
  return (
    <Sheet open={isSheetOpen} onOpenChange={closeSheet}>
      <SheetContent className={`${className ?? ''} overflow-y-scroll `}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription className="text-[#f00000] text-xs">
            {description}
          </SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}

export default CustomSheet

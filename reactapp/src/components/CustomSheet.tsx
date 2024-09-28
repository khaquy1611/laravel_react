import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { SheetProps } from '@/types/Base'

const CustomSheet = ({
  children,
  isSheetOpen,
  closeSheet,
  title,
  className,
  description,
}: SheetProps) => {
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

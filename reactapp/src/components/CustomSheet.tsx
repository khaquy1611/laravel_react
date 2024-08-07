import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { SheetProps } from '@/types/Base'
import { useLocation } from 'react-router-dom'

const CustomSheet = ({
  children,
  isSheetOpen,
  closeSheet,
  title,
  className,
  description,
}: SheetProps) => {
  const localtion = useLocation()
  const segment = localtion.pathname.split('/')
  const views =
    segment.length - 1 > 1 ? `${segment[1]}/${segment[2]}` : `${segment[1]}`
  return (
    <Sheet open={isSheetOpen} onOpenChange={closeSheet}>
      <SheetContent className={`${className ?? ''} overflow-y-scroll`}>
        <SheetHeader>
          <SheetTitle>
            {Object.prototype.hasOwnProperty.call(title[views], 'create')
              ? title[views].create.title
              : title[views].title}
          </SheetTitle>
          <SheetDescription className="text-[#f00]">
            {description}
          </SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}

export default CustomSheet

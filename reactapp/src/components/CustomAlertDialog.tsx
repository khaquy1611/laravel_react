import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { ReloadIcon } from '@radix-ui/react-icons'

import { CustomAlertDialogProps } from '@/types/Base'

const CustomAlertDialog = ({
  isOpen,
  title,
  description,
  closeAlertDialog,
  confirmAction,
  isDialogLoading,
}: CustomAlertDialogProps) => {
  return (
    <AlertDialog open={isOpen}>
      {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-[12px] text-[#f00000]">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={closeAlertDialog}>
            Hủy Bỏ
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isDialogLoading}
            className="text-white cursor-pointer"
            onClick={confirmAction}
          >
            {isDialogLoading ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isDialogLoading ? 'Đang xử lý' : 'Thực hiện thao tác'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CustomAlertDialog

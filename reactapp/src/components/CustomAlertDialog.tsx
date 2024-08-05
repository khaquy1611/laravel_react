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
import { CustomAlertDialogType } from '@/types/Base'

const CustomAlertDialog = ({
  isOpen,
  title,
  desciption,
  closeAlertDialog,
  confirmAction,
}: CustomAlertDialogType) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{desciption}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={closeAlertDialog}>
            Hủy Bỏ
          </AlertDialogCancel>
          <AlertDialogAction className="text-white" onClick={confirmAction}>
            Thực hiện
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CustomAlertDialog

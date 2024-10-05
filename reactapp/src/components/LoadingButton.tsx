import { ReloadIcon } from '@radix-ui/react-icons'
import { Button } from './ui/button'
import { LoadingButtonProps } from '@/types/Base'

const LoadingButton = ({ loading, text }: LoadingButtonProps) => {
  return (
    <Button
      disabled={loading}
      className="text-xs  bg-blue-500 text-white hover:bg-blue-700 hover:text-white py-2 shadow-button rounded-md"
      variant="outline"
    >
      {loading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : null}
      {loading ? 'Đang xử lí' : text}
    </Button>
  )
}

export default LoadingButton

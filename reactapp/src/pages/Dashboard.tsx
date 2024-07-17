import { useMount } from "@/hooks/useMount"
import { useToast } from "@/contexts/ToastContext"
import { showNotify } from "@/helpers/myHelper"
const Dashboard = () => {
  const { message, type, setMessage } = useToast()
  useMount(() => {
    showNotify(message, type, setMessage)
  })
  return (
    <div>Đây là trang Dashboard</div>
  )
}

export default Dashboard
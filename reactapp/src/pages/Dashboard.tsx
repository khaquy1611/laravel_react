import { useMount } from '@/hooks/useMount'
import { showToast } from '@/helpers/myHelper'
import { RootState } from '@/redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { clearToast } from '@/redux/slice/toastSlice'
const Dashboard = () => {
  const { message, type } = useSelector((state: RootState) => state.toast)
  const dispatch = useDispatch()
  // const { message, type, setMessage } = useToast()
  useMount(() => {
    showToast(message, type)
    dispatch(clearToast())
  })
  return <div>Đây là trang Dashboard</div>
}

export default Dashboard

import PageHeading from '@/components/Heading'
import { breadcrumb  } from '@/constants'
const Dashboard = () => {
  return (
    <>
      <PageHeading breadcrumb={breadcrumb} />
      Đây là trang Dashboard
    </>
  )
}

export default Dashboard

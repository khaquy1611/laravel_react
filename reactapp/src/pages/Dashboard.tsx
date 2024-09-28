import PageHeading from '@/components/Heading'
const Dashboard = () => {
  const breadcrumb = {
    title: 'Thống kê chung',
    route: '/dashboard',
  }
  return (
    <>
      <PageHeading breadcrumb={breadcrumb} />
      Đây là trang Dashboard
    </>
  )
}

export default Dashboard

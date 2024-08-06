/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { Link, useLocation } from 'react-router-dom'

const PageHeading = ({ breadcrumb }: any) => {
  const localtion = useLocation()
  const segment = localtion.pathname.split('/')
  const views =
    segment.length - 1 > 1 ? `${segment[1]}/${segment[2]}` : `${segment[1]}`
  return (
    <div className="page-heading w-[100%] py-[20px] relative bg-white border-b border-[#e7eaec]">
      <div className="px-[10px]">
        <h2 className="text-[24px] mb-[5px]">{breadcrumb[views].title}</h2>
        <Breadcrumb>
          <BreadcrumbList>
            <div className="flex items-center justify-center">
              <BreadcrumbItem>
                <Link to={'/dashboard'}>
                  {views === 'dashboard' ? (
                    <BreadcrumbPage>{'Dashboard'}</BreadcrumbPage>
                  ) : (
                    'Dashboard'
                  )}
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link to={breadcrumb.route}>
                  <BreadcrumbPage>{breadcrumb[views].title}</BreadcrumbPage>
                </Link>
              </BreadcrumbItem>
            </div>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  )
}

export default PageHeading

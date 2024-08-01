import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { useLocation } from 'react-router-dom'
import { breadcrumb, breadcrumbLabelMap } from '@/constants'
import { Link } from 'react-router-dom'

const PageHeading = () => {
  const localtion = useLocation()
  const segment = localtion.pathname.split('/')[1]
  const label = breadcrumbLabelMap[segment]
  return (
    <>
      <div className="page-heading w-[100%] py-[20px] relative bg-white border-b border-[#e7eaec]">
        <div className="px-[10px]">
          <h2 className="text-[24px] mb-[5px]">{label}</h2>
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumb &&
                breadcrumb.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-center"
                  >
                    {index > 0 && <BreadcrumbSeparator />}
                    <BreadcrumbItem>
                      <Link to={item.route}>
                        {item.active.includes(segment) ? (
                          <BreadcrumbPage>{item.title}</BreadcrumbPage>
                        ) : (
                          <>{item.title}</>
                        )}
                      </Link>
                    </BreadcrumbItem>
                  </div>
                ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </>
  )
}

export default PageHeading

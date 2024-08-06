import PageHeading from '@/components/Heading'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { breadcrumb } from '@/constants'

const Store = () => {
  return (
    <>
      <PageHeading breadcrumb={breadcrumb} />
      <div className="container mt-[15px]">
        <div className="grid grid-cols-2 gap-4">
          <div className="card-description">
            <div className="panel-head mb-[15px] text-[20px] font-weight text-[#1a1a1a]">
              Thông tin chung
            </div>
            <div className="panel-body">
              <p className="mb-[10px] text-[15px]">
                Nhập đầy đủ thông tin của người sử dụng ở ô biểu mẫu sau
              </p>
              <p className="mb-[10px] text-[15px]">
                Lưu ý: Những trường đánh{' '}
                <span className="text-[#f00]">(*) là bắt buộc</span>{' '}
              </p>
            </div>
          </div>
          <>
            <Card className="rounded-[5px] mt-[15px]">
              <CardContent className="p-[15px]">
                <div className="grid grid-cols-2">
                  <div className="form-row">
                    <div className="mb-[5px] font-semibold">
                      Email <span className="text-[#f00]">(*)</span>
                    </div>
                    <Input />
                  </div>
                  <div className="form-row">
                    <div className="mb-[5px] font-semibold">
                      Email <span className="text-[#f00]">(*)</span>
                    </div>
                    <Input />
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        </div>
      </div>
    </>
  )
}

export default Store

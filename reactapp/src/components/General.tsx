/* eslint-disable react-refresh/only-export-components */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CustomCKEditor from '@/components/CustomCKEditor'
import CustomInput from './CustomInput'
import { memo } from 'react'

const General = () => {
  return (
    <Card className="rounded-[5px] mb-[20px]">
      <CardHeader className="border-b border-solid border-[#f3f3f3] p-[15px]">
        <CardTitle className="uppercase">Thông tin chung</CardTitle>
      </CardHeader>
      <CardContent className="pt-[15px]">
        <CustomInput
          label="Tiêu đề"
          name="name"
          type="text"
          defaultValue=""
          className="gap-4 mb-[20px]"
          labelClassName="mb-[10px] block"
          inputClassName="border-[#ccced1]"
          required={true}
        />

        <CustomCKEditor
          label="Mô tả ngắn"
          className="ckeditor-description mb-[20px]"
          name="description"
        />

        <CustomCKEditor
          label="Nội dung"
          className="ckeditor-content"
          name="content"
        />
      </CardContent>
    </Card>
  )
}

export default memo(General)

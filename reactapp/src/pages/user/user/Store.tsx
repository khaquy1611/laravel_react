import CustomInput from '@/components/CustomInput'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Select from 'react-select'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const Store = () => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ]
  const store = [
    {
      label: 'Họ tên',
      id: 'fullName',
      type: 'text',
    },
    {
      label: 'Email (*)',
      id: 'email',
      type: 'email',
    },
    {
      label: 'Điện thoại',
      id: 'phone',
      type: 'text',
    },
    {
      label: 'Mật khẩu (*)',
      id: 'password',
      type: 'password',
    },
    {
      label: 'Nhập lại mk (*)',
      id: 'confirmPassword',
      type: 'password',
    },
    {
      label: 'Ngày sinh',
      id: 'birthday',
      type: 'date',
    },
  ]
  return (
    <>
      <div className="grid gap-4 py-4">
        {store &&
          store.map((item, index) => (
            <CustomInput
              label={item.label}
              id={item.id}
              type={item.type}
              key={index}
            />
          ))}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="image" className="text-right">
            Ảnh đại diện
          </Label>
          <Input type="file" id="image" className="col-span-3" />
        </div>
        <div className="text-center">
          <Avatar className="w-[100px] h-[100px] inline-block">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="image" className="text-right">
            Nhóm User
          </Label>
          <Select options={options} className="w-[320px]" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="image" className="text-right">
            Thành Phố
          </Label>
          <Select options={options} className="w-[320px]" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="image" className="text-right">
            Quận Huyện
          </Label>
          <Select options={options} className="w-[320px]" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="image" className="text-right">
            Phường Xã
          </Label>
          <Select options={options} className="w-[320px]" />
        </div>

        <CustomInput label="Địa chỉ" id="address" type="text" />
      </div>
      <div className="text-right">
        <Button className="flex-right text-[#fff] font-normal text-xs">
          Lưu Thông Tin
        </Button>
      </div>
    </>
  )
}

export default Store

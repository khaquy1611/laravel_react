import { MdArrowBack } from "react-icons/md"
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

type BackButtonProps = {
  link: string
}
const BackButton = ({ link }: BackButtonProps) => {
  return (
    <Link to={link}>
      <Button
        className="text-xs  bg-green-500 my-4 text-white hover:bg-green-700 hover:text-white py-2 shadow-button rounded-md"
        variant="outline"
      >
        <MdArrowBack size={16} />
        Quay lại trang trước
      </Button>
    </Link>
  )
}

export default BackButton

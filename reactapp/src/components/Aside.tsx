import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FaHome, FaUser, FaCube } from 'react-icons/fa'
import '@/assets/scss/Accordion.scss'
const Aside = () => {
  return (
    <aside className="app-aside w-60 bg-[#111c43] h-full fixed">
      <div className="main-sidebar-header w-60 p-3.5 fixed z-10 h-14 text-center border-solid border-b border-menu-border">
        <a href="" className="inline-block">
          <img
            className="h-8"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4RuGVZl1-y9LRD9J82X7o0XKywcolQGoHoA&s"
            alt=""
          />
        </a>
      </div>
      <div className="main-sidebar mt-14">
        <div className="menu-category px-6 py-3 text-menu-color text-11px tracking-wide font-semibold opacity-50">
          MAIN
        </div>
        <Accordion type="single" collapsible className="px-3 sidebar-accordion">
          <AccordionItem value="item-1" className="bg-menu-active rounded-lg">
            <AccordionTrigger className="text-menu-color">
              <div className="menu-label flex flex-1 items-center">
                <FaHome className="text-sm mr-2" />
                <span>Dashboard</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-0">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="menu-category px-6 py-3 text-menu-color text-11px tracking-wide font-semibold opacity-50">
          Function
        </div>
        <Accordion type="single" collapsible className="px-3 sidebar-accordion">
          <AccordionItem value="item-1" className="rounded-lg">
            <AccordionTrigger className="text-menu-color">
              <div className="menu-label flex flex-1 items-center">
                <FaUser className="text-sm mr-2" />
                <span>Quản Lý Thành Viên</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-0">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="rounded-lg">
            <AccordionTrigger className="text-menu-color">
              <div className="menu-label flex flex-1 items-center">
                <FaCube className="text-sm mr-2" />
                <span>Quản Lý Sản Phẩm</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-0">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  )
}

export default Aside

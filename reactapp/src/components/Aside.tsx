import { useLocation } from 'react-router-dom'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import { MenuConfig } from '@/constants/Sidebar'
import '@/assets/scss/Accordion.scss'
import '@/assets/scss/Aside.scss'

const Aside = () => {
  const localtion = useLocation()
  const segment = localtion.pathname.split('/')[1]

  const getOpenAccordionValue = () => {
    for (let groupIndex = 0; groupIndex < MenuConfig.length; groupIndex++) {
      const group = MenuConfig[groupIndex]
      for (let itemIndex = 0; itemIndex < group.items.length; itemIndex++) {
        const item = group.items[itemIndex]
        if (item.active.includes(segment)) {
          return `item-${groupIndex}-${itemIndex}`
        }
      }
    }
  }
  const defaultValue = getOpenAccordionValue()

  return (
    <aside className="app-aside w-60 bg-[#111c43] h-full fixed top-0">
      <div className="main-sidebar-header w-60 p-0.5 fixed z-10 h-14 text-center border-solid border-b rounded-lg border-menu-border">
        <a href="" className="inline-block sidebar-logo">
          <Logo />
        </a>
      </div>

      <div className="main-sidebar mt-14">
        {MenuConfig &&
          MenuConfig.map((group, index) => (
            <div key={index}>
              <div className="menu-category px-6 py-3 text-menu-color text-11px tracking-wide font-semibold opacity-50">
                {group.label}
              </div>

              <Accordion
                type="single"
                collapsible
                className="px-3 sidebar-accordion"
                defaultValue={defaultValue}
              >
                {group.items.map((item, itemIndex) => (
                  <AccordionItem
                    key={itemIndex}
                    value={`item-${index}-${itemIndex}`}
                  >
                    <AccordionTrigger
                      className={` rounded-lg ${
                        item.active.includes(segment)
                          ? `text-menu-color bg-menu-active`
                          : ``
                      }`}
                    >
                      <div
                        className={`menu-label flex flex-1 items-center text-menu-color ${
                          item.active.includes(segment) ? `text-white` : ''
                        } `}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="border-0 mt-1">
                      <ul>
                        {item.links.map((links, linksIndex) => (
                          <li className="pl-6" key={linksIndex}>
                            <Link
                              to={links.to}
                              className="side-menu__item block text-menu-color text-13px relative hover:text-white rounded-lg hover:bg-menu-active"
                            >
                              {links.title}
                              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 w-1 h-1 border border-solid border-primary rounded-full border-white"></span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
      </div>
    </aside>
  )
}

export default Aside

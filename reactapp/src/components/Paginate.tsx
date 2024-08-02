import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface PaginationLink {
  url: string | null
  label: string
  active: boolean
}

type PaginationProps = {
  links: PaginationLink[]
  pageChange: (page: number | null) => void
  totalPages: number
}

const Paginate = ({ links, pageChange, totalPages }: PaginationProps) => {
  const activeLinkIndex = links.findIndex(link => link.active)
  const filterLinks = links.filter(
    (link, index) =>
      index !== 0 &&
      index !== links.length - 1 &&
      index >= activeLinkIndex - 3 &&
      index <= activeLinkIndex + 3
  )
  const handlePageChange = (page: number | null) => {
    pageChange(page)
  }

  return (
    <Pagination>
      <PaginationContent>
        {activeLinkIndex > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={e => {
                e.preventDefault()
                handlePageChange(parseInt(links[activeLinkIndex - 1].label))
              }}
              className="cursor-pointer"
            />
          </PaginationItem>
        )}
        {filterLinks &&
          filterLinks.map((link, index) => (
            <PaginationItem key={index} className={link.active ? 'active' : ''}>
              {link.url ? (
                <PaginationLink
                  href="#"
                  onClick={e => {
                    e.preventDefault()
                    handlePageChange(parseInt(link.label))
                  }}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              ) : null}
            </PaginationItem>
          ))}

        {activeLinkIndex <= links.length - 1 && (
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={e => {
                e.preventDefault()
                handlePageChange(parseInt(links[activeLinkIndex + 1].label))
              }}
              className={`cursor-pointer ${
                activeLinkIndex === totalPages ? 'hidden' : 'visible'
              }`}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}

export default Paginate

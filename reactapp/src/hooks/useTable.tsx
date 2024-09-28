/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterParamsProps } from '@/types/Base'
import { useCallback, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'

type UseTableProps = {
  model: string
  pagination: any
}
const useTable = ({ pagination }: UseTableProps) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const currentPage = searchParams.get('page')
    ? parseInt(searchParams.get('page')!)
    : 1
  const initialParams: FilterParamsProps = {}
  searchParams.forEach((value, key) => {
    if (key !== 'page') {
      initialParams[key] = value || ''
    }
  })
  const createQueryString = (initialParams: FilterParamsProps) => {
    const query = Object.keys(initialParams)
      .filter(key => {
        const value = initialParams[key]
        return !(
          value === null ||
          value === '' ||
          value === 0 ||
          value === undefined
        )
      })
      .map(
        key =>
          `${encodeURIComponent(key)}=${encodeURIComponent(initialParams[key])}`
      )
      .join('&')
    return query
  }
  const [queryString, setQueryString] = useState<string>(() => {
    const query = createQueryString(initialParams)
    if (query) {
      return `page=${currentPage}${query !== '' ? `&${query}` : ''}`
    }
    return `page=${currentPage}`
  })
  const [filters, setFilters] = useState<FilterParamsProps>({})

  const [page, setPage] = useState<number | null>(currentPage)
  const { isLoading, data, isError, refetch } = useQuery(
    ['users', queryString],
    () => pagination(queryString)
  )

  const handlePageChange = (page: number | null) => {
    setPage(page)
    navigate(`?${queryString}`)
  }
  const handleQueryString = useCallback((filters: FilterParamsProps) => {
    setFilters(filters)
  }, [])
  useEffect(() => {
    setFilters(initialParams)
  }, [])
  useEffect(() => {
    const query = createQueryString(filters)
    const queryString = `page=${page}${query !== '' ? `&${query}` : ''}`
    setQueryString(queryString)
  }, [filters, page])
  useEffect(() => {
    navigate(`?${queryString}`)
    refetch()
  }, [navigate, queryString, refetch])
  return {
    isLoading,
    data,
    isError,
    queryString,
    refetch,
    handlePageChange,
    handleQueryString,
    initialParams,
  }
}

export default useTable

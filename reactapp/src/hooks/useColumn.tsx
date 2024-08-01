/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserType } from '@/types/User'
import { useEffect, useState } from 'react'

interface UserState {
  [userId: string]: {
    [columnName: string]: boolean
  }
}

interface useColumnStateReturn {
  columnState: UserState
  handleChecked: (userId: number, columnName: string) => void
}

const useColumnState = (
  users: UserType[],
  columnName: string,
  isLoading: boolean
): useColumnStateReturn => {
  const [columnState, setColumnState] = useState<UserState>({})
  const handleChecked = (userId: number, columnName: string) => {
    setColumnState(prevState => ({
      ...prevState,
      [userId]: {
        ...prevState[userId],
        [columnName]: !prevState[userId]?.[columnName],
      },
    }))
  }
  const setInitialColumnState = (users: UserType[], columnName: string) => {
    const newState = users.reduce((acc: any, user: any) => {
      acc[user.id] = {
        [columnName]: user[columnName] === 2,
      }
      return acc
    }, {})

    setColumnState(newState)
  }
  useEffect(() => {
    if (!isLoading && users) {
      setInitialColumnState(users, columnName)
    }
  }, [users, isLoading, columnName])

  return { columnState, handleChecked }
}

export default useColumnState

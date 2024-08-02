/* eslint-disable @typescript-eslint/no-explicit-any */
import { UpdateStatusByField } from '@/services/BaseServices'
import { UserState, UserType } from '@/types/User'
import { useEffect, useState } from 'react'

interface useColumnStateReturn {
  columnState: UserState
  handleChecked: (userId: number, columnName: string, model: string) => void
}

const useColumnState = (
  users: UserType[],
  columnName: string,
  isLoading: boolean
): useColumnStateReturn => {
  const [columnState, setColumnState] = useState<UserState>({})

  const handleChecked = (userId: number, columnName: string, model: string) => {
    const params = {
      id: userId,
      value: !columnState[userId]?.[columnName],
      column: 'publish',
      model: model,
    }
    UpdateStatusByField(params)
    setColumnState(prevState => ({
      ...prevState,
      [userId]: {
        ...prevState[userId],
        [columnName]: !prevState[userId]?.[columnName],
      },
    }))
  }

  useEffect(() => {
    const newState =
      !isLoading &&
      users.reduce((acc: any, user: any) => {
        acc[user.id] = {
          [columnName]: user[columnName] === 2,
        }
        return acc
      }, {})

    setColumnState(newState)
  }, [users, isLoading, columnName])

  return { columnState, handleChecked }
}

export default useColumnState

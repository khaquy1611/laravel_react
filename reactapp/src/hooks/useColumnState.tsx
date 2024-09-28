/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { UserState, UserType } from '@/types/User'
import { updateStatusByField } from '@/services/BaseServices'

interface useColumnStateReturn {
  columnState: UserState
  handleChecked: (
    userId: string | number,
    columnName: string,
    model: string
  ) => void
  setInitialColumnState: (users: UserType[], columnName: string) => void
}

const useColumnState = (): useColumnStateReturn => {
  const [columnState, setColumnState] = useState<UserState>({})
  const handleChecked = (
    userId: string | number,
    columnName: string,
    model: string
  ) => {
    const params = {
      id: userId,
      value: !columnState[userId]?.[columnName],
      column: 'publish',
      model: model,
    }

    updateStatusByField(params)

    setColumnState(prevState => ({
      ...prevState,
      [userId]: {
        ...prevState[userId],
        [columnName]: !prevState[userId]?.[columnName],
      },
    }))
  }

  const setInitialColumnState = (users: UserType[], columnName: string) => {
    const initialState = users.reduce((acc: UserState, user: any) => {
      acc[user.id] = {
        ...acc[user.id],
        [columnName]: user[columnName] === 2,
      }
      return acc
    }, {})
    setColumnState(initialState)
  }

  return { columnState, handleChecked, setInitialColumnState }
}
export default useColumnState

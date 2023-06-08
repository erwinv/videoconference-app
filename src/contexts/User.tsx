import { noop } from 'lodash-es'
import { createContext, type PropsWithChildren } from 'react'
import { useUserState } from '~/contexts/hooks/useUser'

const initialUserState: ReturnType<typeof useUserState> = {
  user: null,
  setUser: noop,
  getVideoToken: async () => '',
}

export const UserContext = createContext(initialUserState)

export function UserProvider({ children }: PropsWithChildren) {
  const userState = useUserState()
  return <UserContext.Provider value={userState}>{children}</UserContext.Provider>
}

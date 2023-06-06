// import type firebase from 'firebase/compat/app'
// import { doc, onSnapshot, type DocumentReference } from 'firebase/firestore'
import { noop } from 'lodash-es'
import { createContext, useCallback, useContext, useState, type PropsWithChildren } from 'react'
import { API_URL } from '~/constants'
// import { getAuth, getDb } from '~/firebase'

interface User {
  uid: string
  name: string
  photo?: string
  photoURL?: string
  getIdToken: () => Promise<string>
}

function useUserState() {
  const [{ user }, setUserState] = useState({
    user: null as User | null,
  })

  const setUser = useCallback((user?: User | null) => {
    setUserState((state) => ({
      ...state,
      user: user ?? null,
    }))
  }, [])

  const getVideoToken = useCallback(
    async (booking: string) => {
      if (!user) return ''

      const { token } = await fetch(new URL('/api/v1/video/token', API_URL), {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${await user.getIdToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ booking }),
      }).then(async (resp) => {
        const body = await resp.json()
        if (!resp.ok) throw body
        return body as Record<string, string>
      })
      return token
    },
    [user]
  )

  return {
    user,
    setUser,
    getVideoToken,
  }
}

const initialUserState: ReturnType<typeof useUserState> = {
  user: null,
  setUser: noop,
  getVideoToken: async () => '',
}

const UserContext = createContext(initialUserState)

export function UserProvider({ children }: PropsWithChildren) {
  const userState = useUserState()
  return <UserContext.Provider value={userState}>{children}</UserContext.Provider>
}

export function useUserContext() {
  return useContext(UserContext)
}

import { onAuthStateChanged, signInAnonymously, type User } from 'firebase/auth'
import { noop } from 'lodash-es'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react'
import { API_URL } from '~/constants'
import { getAuth } from '~/firebase'

function useUserState() {
  const [{ user }, setUserState] = useState({
    user: getAuth().currentUser,
  })

  const setUser = useCallback((user?: User | null) => {
    setUserState((state) => ({
      ...state,
      user: user ?? null,
    }))
  }, [])

  useEffect(() => {
    return onAuthStateChanged(getAuth(), (user) => {
      setUserState((state) => ({
        ...state,
        user,
      }))

      if (!user) {
        signInAnonymously(getAuth())
      }
    })
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

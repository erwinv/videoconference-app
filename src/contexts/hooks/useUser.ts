import { onAuthStateChanged, signInAnonymously, type User } from 'firebase/auth'
import { useCallback, useContext, useEffect, useState } from 'react'
import { API_URL } from '~/constants'
import { UserContext } from '~/contexts/User'
import { getAuth } from '~/firebase'

export function useUserState() {
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
    async (meetingId: string) => {
      if (!user) return ''

      const { token } = await fetch(new URL('/api/v1/video/token', API_URL), {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${await user.getIdToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ meetingId }),
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

export function useUserContext() {
  return useContext(UserContext)
}

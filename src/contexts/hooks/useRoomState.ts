import { useEffect, useState } from 'react'
import { useRoomContext } from '~/contexts/hooks/useRoom'

export type RoomState = 'disconnected' | 'connected' | 'reconnecting'

export default function useRoomState() {
  const { room } = useRoomContext()
  const [state, setState] = useState(
    (room?.state as RoomState | undefined) ?? ('disconnected' as RoomState)
  )

  useEffect(() => {
    if (!room) {
      setState('disconnected')
      return
    }
    const setRoomState = () => setState(room.state as RoomState)
    setRoomState()
    room
      .on('disconnected', setRoomState)
      .on('reconnected', setRoomState)
      .on('reconnecting', setRoomState)
    return () => {
      room
      // .off('disconnected', setRoomState)
      // .off('reconnected', setRoomState)
      // .off('reconnecting', setRoomState)
    }
  }, [room])

  return state
}

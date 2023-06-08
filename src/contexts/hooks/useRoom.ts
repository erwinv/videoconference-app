import { useCallback, useContext, useEffect, useState } from 'react'
import { type Room, type TwilioError } from 'twilio-video'
import { RoomContext } from '~/contexts/Room'

export function useRoomState() {
  const [{ id, room, roomStatus, roomError }, setRoomState] = useState({
    id: '',
    room: undefined as Room | undefined,
    roomStatus: '' as Room['state'],
    roomError: undefined as TwilioError | undefined,
  })

  const setRoom = useCallback((room?: Room) => {
    setRoomState((state) => ({
      ...state,
      room,
    }))
  }, [])

  useEffect(() => {
    if (!room) return

    const remove = (_: Room, roomError: TwilioError) => {
      setRoomState((state) => ({
        ...state,
        room: undefined,
        roomError,
      }))
    }

    room.on('disconnected', remove)
    return () => {
      // room.off('disconnected', remove)
    }
  }, [room])

  return {
    id,
    room,
    roomStatus,
    roomError,
    setRoom,
  }
}

export function useRoomContext() {
  return useContext(RoomContext)
}

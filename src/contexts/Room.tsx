import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react'
import { type Room, type TwilioError } from 'twilio-video'

function useRoomState() {
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

const initialRoomState: ReturnType<typeof useRoomState> = {
  id: '',
  room: undefined,
  roomStatus: '',
  roomError: undefined,
  setRoom: () => {},
}

const RoomContext = createContext(initialRoomState)

export function RoomProvider({ children }: PropsWithChildren) {
  const roomState = useRoomState()

  return <RoomContext.Provider value={roomState}>{children}</RoomContext.Provider>
}

export function useRoomContext() {
  return useContext(RoomContext)
}

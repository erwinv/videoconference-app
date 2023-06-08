import { noop } from 'lodash-es'
import { createContext, useContext, type PropsWithChildren } from 'react'
import { useRoomState } from '~/contexts/hooks/useRoom'

const initialRoomState: ReturnType<typeof useRoomState> = {
  id: '',
  room: undefined,
  roomStatus: '',
  roomError: undefined,
  setRoom: noop,
}

export const RoomContext = createContext(initialRoomState)

export function RoomProvider({ children }: PropsWithChildren) {
  const roomState = useRoomState()

  return <RoomContext.Provider value={roomState}>{children}</RoomContext.Provider>
}

export function useRoomContext() {
  return useContext(RoomContext)
}

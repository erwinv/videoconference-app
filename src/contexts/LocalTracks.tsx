import { noop } from 'lodash-es'
import { createContext, type PropsWithChildren } from 'react'
import { useLocalTracksState } from './hooks/useLocalTracks'

const initialLocalTracksState: ReturnType<typeof useLocalTracksState> = {
  localAudioTrack: undefined,
  localVideoTrack: undefined,
  setLocalAudioTrack: noop,
  setLocalVideoTrack: noop,
}

export const LocalTracksContext = createContext(initialLocalTracksState)

export function LocalTracksProvider({ children }: PropsWithChildren) {
  const localTracksState = useLocalTracksState()

  return (
    <LocalTracksContext.Provider value={localTracksState}>{children}</LocalTracksContext.Provider>
  )
}

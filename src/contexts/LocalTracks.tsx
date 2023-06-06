import { noop } from 'lodash-es'
import { createContext, useCallback, useContext, useState, type PropsWithChildren } from 'react'
import { type LocalAudioTrack, type LocalVideoTrack } from 'twilio-video'

function useLocalTracksState() {
  const [{ localAudioTrack, localVideoTrack }, setLocalTracks] = useState({
    localAudioTrack: undefined as LocalAudioTrack | undefined,
    localVideoTrack: undefined as LocalVideoTrack | undefined,
  })

  const setLocalAudioTrack = useCallback((localAudioTrack?: LocalAudioTrack) => {
    setLocalTracks((state) => ({
      ...state,
      localAudioTrack,
    }))
  }, [])

  const setLocalVideoTrack = useCallback((localVideoTrack?: LocalVideoTrack) => {
    setLocalTracks((state) => ({
      ...state,
      localVideoTrack,
    }))
  }, [])

  return {
    localAudioTrack,
    localVideoTrack,
    setLocalAudioTrack,
    setLocalVideoTrack,
  }
}

const initialLocalTracksState: ReturnType<typeof useLocalTracksState> = {
  localAudioTrack: undefined,
  localVideoTrack: undefined,
  setLocalAudioTrack: noop,
  setLocalVideoTrack: noop,
}

const LocalTracksContext = createContext(initialLocalTracksState)

export function LocalTracksProvider({ children }: PropsWithChildren) {
  const localTracksState = useLocalTracksState()

  return (
    <LocalTracksContext.Provider value={localTracksState}>{children}</LocalTracksContext.Provider>
  )
}

export function useLocalTracksContext() {
  return useContext(LocalTracksContext)
}

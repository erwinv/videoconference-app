import { useCallback, useContext, useState } from 'react'
import { type LocalAudioTrack, type LocalVideoTrack } from 'twilio-video'
import { LocalTracksContext } from '~/contexts/LocalTracks'

export function useLocalTracksState() {
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

export function useLocalTracksContext() {
  return useContext(LocalTracksContext)
}

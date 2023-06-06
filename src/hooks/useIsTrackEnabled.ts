import { useEffect, useState } from 'react'
import {
  type LocalAudioTrack,
  type LocalVideoTrack,
  type RemoteAudioTrack,
  type RemoteDataTrack,
  type RemoteVideoTrack,
} from 'twilio-video'
import { isAudioOrVideo } from '~/utils/fns'

export type Track =
  | LocalAudioTrack
  // | LocalDataTrack
  | LocalVideoTrack
  | RemoteAudioTrack
  | RemoteDataTrack
  | RemoteVideoTrack

export default function useIsTrackEnabled(track?: Track) {
  const [isEnabled, setIsEnabled] = useState(isAudioOrVideo(track) ? track.isEnabled : false)

  useEffect(() => {
    setIsEnabled(isAudioOrVideo(track) ? track.isEnabled : false)

    if (!track) return

    const setEnabled = () => setIsEnabled(true)
    const setDisabled = () => setIsEnabled(false)
    track.on('enabled', setEnabled)
    track.on('disabled', setDisabled)
    return () => {
      // track.off('enabled', setEnabled)
      // track.off('disabled', setDisabled)
    }
  }, [track])

  return isEnabled
}

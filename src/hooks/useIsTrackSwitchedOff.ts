import { useEffect, useState } from 'react'
import { type LocalVideoTrack, type RemoteVideoTrack } from 'twilio-video'
import { isVideoRemote } from '~/utils/fns'

// The 'switchedOff' event is emitted when there is not enough bandwidth to support
// a track. See: https://www.twilio.com/docs/video/tutorials/using-bandwidth-profile-api#understanding-track-switch-offs

export default function useIsVideoTrackSwitchedOff(track?: LocalVideoTrack | RemoteVideoTrack) {
  const [isSwitchedOff, setIsSwitchedOff] = useState(
    isVideoRemote(track) ? track.isSwitchedOff : false
  )

  useEffect(() => {
    setIsSwitchedOff(isVideoRemote(track) ? track.isSwitchedOff : false)

    if (!track) return

    const handleSwitchedOff = () => setIsSwitchedOff(true)
    const handleSwitchedOn = () => setIsSwitchedOff(false)
    track.on('switchedOff', handleSwitchedOff)
    track.on('switchedOn', handleSwitchedOn)
    return () => {
      // track.off('switchedOff', handleSwitchedOff)
      // track.off('switchedOn', handleSwitchedOn)
    }
  }, [track])

  return isSwitchedOff
}

import { Box } from '@mui/joy'
import { useEffect, useRef } from 'react'
import { type LocalVideoTrack, type RemoteVideoTrack, type Track } from 'twilio-video'
import useMediaStreamTrack from '~/hooks/useMediaStreamTrack'
import useVideoTrackDimensions from '~/hooks/useVideoTrackDimensions'
import { isVideoLocal, isVideoRemote } from '~/utils/fns'

interface VideoTrackProps {
  track: LocalVideoTrack | RemoteVideoTrack
  priority?: Track.Priority
}

export default function VideoTrack({ track, priority }: VideoTrackProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const mediaStreamTrack = useMediaStreamTrack(track)
  const dimensions = useVideoTrackDimensions(track)
  const isPortrait = (dimensions?.height ?? 0) > (dimensions?.width ?? 0)

  useEffect(() => {
    if (!ref.current) return

    const el = ref.current
    el.muted = true
    if (isVideoRemote(track) && priority) {
      track.setPriority(priority)
    }
    track.attach(el)

    return () => {
      track.detach(el)
      el.srcObject = null

      if (isVideoRemote(track) && priority) {
        track.setPriority(null)
      }
    }
  }, [track, priority])

  const isScreenShare = track.name.includes('screen')
  const isFrontFacing = mediaStreamTrack?.getSettings().facingMode !== 'environment'
  const shouldMirror = isVideoLocal(track) && !isScreenShare && isFrontFacing

  return (
    <Box
      component="video"
      ref={ref}
      sx={{
        width: '100%',
        height: '100%',
        transform: shouldMirror ? 'scaleX(-1)' : '',
        objectFit: isPortrait || isScreenShare ? 'contain' : 'cover',
      }}
    />
  )
}

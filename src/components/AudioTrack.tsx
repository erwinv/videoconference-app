import { useEffect, useRef } from 'react'
import { type AudioTrack as IAudioTrack } from 'twilio-video'
import { useDevicesContext } from '~/contexts/hooks/useDevices'

declare global {
  interface HTMLMediaElement {
    setSinkId?(sinkId: MediaDeviceInfo['deviceId']): Promise<undefined>
  }
}

interface AudioTrackProps {
  track: IAudioTrack
}

export default function AudioTrack({ track }: AudioTrackProps) {
  const { speakers } = useDevicesContext()
  const audioEl = useRef<HTMLAudioElement>()

  useEffect(() => {
    audioEl.current = track.attach()
    document.body.appendChild(audioEl.current)
    return () => {
      for (const el of track.detach()) {
        el.remove()
      }
    }
  }, [track])

  useEffect(() => {
    if (!speakers) return
    audioEl.current?.setSinkId?.(speakers)
  }, [speakers])

  return null
}

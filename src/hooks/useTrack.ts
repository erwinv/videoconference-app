import { useEffect, useState } from 'react'
import {
  type LocalAudioTrack,
  type LocalAudioTrackPublication,
  type LocalDataTrack,
  type LocalDataTrackPublication,
  type LocalVideoTrack,
  type LocalVideoTrackPublication,
  type RemoteAudioTrack,
  type RemoteAudioTrackPublication,
  type RemoteDataTrack,
  type RemoteDataTrackPublication,
  type RemoteVideoTrack,
  type RemoteVideoTrackPublication,
} from 'twilio-video'

type TrackType<P> = P extends LocalAudioTrackPublication
  ? LocalAudioTrack
  : P extends LocalDataTrackPublication
  ? LocalDataTrack
  : P extends LocalVideoTrackPublication
  ? LocalVideoTrack
  : P extends RemoteAudioTrackPublication
  ? RemoteAudioTrack
  : P extends RemoteDataTrackPublication
  ? RemoteDataTrack
  : P extends RemoteVideoTrackPublication
  ? RemoteVideoTrack
  : never

export default function useTrack<
  T extends
    | LocalAudioTrackPublication
    | LocalDataTrackPublication
    | LocalVideoTrackPublication
    | RemoteAudioTrackPublication
    | RemoteDataTrackPublication
    | RemoteVideoTrackPublication
>(publication?: T) {
  const [track, setTrack] = useState((publication?.track as TrackType<T> | undefined) ?? undefined)

  useEffect(() => {
    setTrack((publication?.track as TrackType<T> | undefined) ?? undefined)
    if (!publication) return

    const removeTrack = () => setTrack(undefined)

    publication.on('subscribed', setTrack)
    publication.on('unsubscribed', removeTrack)
    return () => {
      // publication.off('subscribed', setTrack)
      // publication.off('unsubscribed', removeTrack)
    }
  }, [publication])

  return track
}

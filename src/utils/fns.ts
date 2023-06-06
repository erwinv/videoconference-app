import type { SxProps } from '@mui/joy/styles/types'
import { isNil, negate } from 'lodash-es'
import {
  type LocalAudioTrack,
  type LocalAudioTrackPublication,
  type LocalDataTrack,
  type LocalTrack,
  type LocalTrackPublication,
  type LocalVideoTrack,
  type LocalVideoTrackPublication,
  type RemoteAudioTrack,
  type RemoteAudioTrackPublication,
  type RemoteDataTrack,
  type RemoteTrack,
  type RemoteTrackPublication,
  type RemoteVideoTrack,
  type RemoteVideoTrackPublication,
} from 'twilio-video'

export function isAudioPublication(
  x?: LocalTrackPublication | RemoteTrackPublication
): x is LocalAudioTrackPublication | RemoteAudioTrackPublication {
  if (!x) return false
  return x.kind === 'audio'
}

export function isVideoPublication(
  x?: LocalTrackPublication | RemoteTrackPublication
): x is LocalVideoTrackPublication | RemoteVideoTrackPublication {
  if (!x) return false
  return x.kind === 'video'
}

export type Track =
  | LocalAudioTrack
  | LocalDataTrack
  | LocalVideoTrack
  | RemoteAudioTrack
  | RemoteDataTrack
  | RemoteVideoTrack

export function isAudioOrVideo(x?: Track): x is Exclude<Track, LocalDataTrack | RemoteDataTrack> {
  if (!x) return false
  return x.kind !== 'data'
}

export function isLocalVideo(x: LocalTrack): x is LocalVideoTrack {
  return x.kind === 'video'
}

export function isLocalAudio(x: LocalTrack): x is LocalAudioTrack {
  return x.kind === 'audio'
}

export function isRemote(x?: LocalTrack | RemoteTrack): x is RemoteTrack {
  if (!x) return false
  return Object.hasOwn(x, 'priority')
}

export function isRemoteVideo(x: RemoteTrack): x is RemoteVideoTrack {
  return x.kind === 'video'
}

export function isRemoteAudio(x: RemoteTrack): x is RemoteAudioTrack {
  return x.kind === 'audio'
}

export function isVideoRemote(x?: LocalVideoTrack | RemoteVideoTrack): x is RemoteVideoTrack {
  if (!x) return false
  return Object.hasOwn(x, 'sid')
}

export function isVideoLocal(x?: LocalVideoTrack | RemoteVideoTrack): x is LocalVideoTrack {
  if (!x) return false
  return Object.hasOwn(x, 'id')
}

export type Updater<T> = (x: T) => T
export type ValueOrUpdater<T> = T | Updater<T>

export function isUpdater<T>(x: ValueOrUpdater<T>): x is Updater<T> {
  return typeof x === 'function'
}

export type Callback<Args extends unknown[] = [], Ret = void> = (...args: Args) => Ret

export function style<P extends SxProps>(sxProps: P) {
  return sxProps
}

export function getInitials(name?: string | null) {
  if (!name) return

  const [first, ...rest] = name.split(/\s+/)
  const last = rest.pop()!
  return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
}

export function isNotNil<T>(x: T | null | undefined): x is T {
  const notNil = negate(isNil)
  return notNil(x)
}

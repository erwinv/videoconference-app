import { useEffect, useState } from 'react'
import { type RemoteAudioTrack, type RemoteParticipant } from 'twilio-video'
import { isRemoteAudio } from '~/utils/fns'

export default function useRemoteAudioTracks(participant: RemoteParticipant) {
  const [audioTracks, setAudioTracks] = useState(
    Array.from(participant.audioTracks.values()).flatMap((pub) => (pub.track ? [pub.track] : []))
  )

  useEffect(() => {
    setAudioTracks(
      Array.from(participant.audioTracks.values()).flatMap((pub) => (pub.track ? [pub.track] : []))
    )

    const addTrack = (newTrack: RemoteAudioTrack) => {
      if (isRemoteAudio(newTrack)) {
        setAudioTracks((tracks) => [...tracks, newTrack])
      }
    }
    const removeTrack = (removedTrack: RemoteAudioTrack) => {
      if (isRemoteAudio(removedTrack)) {
        setAudioTracks((tracks) => tracks.filter((t) => t.sid !== removedTrack.sid))
      }
    }
    participant.on('trackSubscribed', addTrack).on('trackUnsubscribed', removeTrack)
    return () => {
      // participant.off('trackSubscribed', addTrack).off('trackUnsubscribed', removeTrack)
    }
  }, [participant])

  return audioTracks
}

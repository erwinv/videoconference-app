import { type PropsWithChildren } from 'react'
import { type RemoteParticipant } from 'twilio-video'
import AudioTrack from '~/components/AudioTrack'
import useRemoteAudioTracks from '~/contexts/hooks/useRemoteAudioTracks'
import useParticipants from '~/hooks/useParticipants'

interface ParticipantAudioTrackProps {
  participant: RemoteParticipant
}

function ParticipantAudio({ participant }: PropsWithChildren<ParticipantAudioTrackProps>) {
  const audioTracks = useRemoteAudioTracks(participant)
  return (
    <>
      {audioTracks.map((track) => (
        <AudioTrack key={track.sid} track={track} />
      ))}
    </>
  )
}

export function ParticipantAudioTracks() {
  const participants = useParticipants()

  return (
    <>
      {participants.map((participant) => (
        <ParticipantAudio key={participant.sid} participant={participant} />
      ))}
    </>
  )
}

import { useEffect, useState } from 'react'
import { type RemoteParticipant } from 'twilio-video'
import { useRoomContext } from '~/contexts/Room'

export default function useDominantSpeaker(includeNull = false) {
  const { room } = useRoomContext()
  const [dominantSpeaker, setDominantSpeaker] = useState(room?.dominantSpeaker ?? undefined)

  useEffect(() => {
    setDominantSpeaker(room?.dominantSpeaker ?? undefined)
    if (!room) return

    // Sometimes, the 'dominantSpeakerChanged' event can emit 'null', which means that
    // there is no dominant speaker. If we change the main participant when 'null' is
    // emitted, the effect can be jarring to the user. Here we ignore any 'null' values
    // and continue to display the previous dominant speaker as the main participant.
    const handleDominantSpeakerChanged = (newDominantSpeaker: RemoteParticipant) => {
      if (includeNull || newDominantSpeaker !== null) {
        setDominantSpeaker(newDominantSpeaker)
      }
    }

    // Since 'null' values are ignored, we will need to listen for the 'participantDisconnected'
    // event, so we can set the dominantSpeaker to 'null' when they disconnect.
    const handleParticipantDisconnected = (participant: RemoteParticipant) => {
      setDominantSpeaker((prevDominantSpeaker) => {
        return prevDominantSpeaker === participant ? undefined : prevDominantSpeaker
      })
    }

    room.on('dominantSpeakerChanged', handleDominantSpeakerChanged)
    room.on('participantDisconnected', handleParticipantDisconnected)
    return () => {
      // room.off('dominantSpeakerChanged', handleDominantSpeakerChanged)
      // room.off('participantDisconnected', handleParticipantDisconnected)
    }
  }, [room, includeNull])

  return dominantSpeaker
}

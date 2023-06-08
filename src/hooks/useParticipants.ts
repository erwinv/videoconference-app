import { useEffect, useState } from 'react'
import { type RemoteParticipant } from 'twilio-video'
import { useRoomContext } from '~/contexts/hooks/useRoom'

export default function useParticipants() {
  const { room } = useRoomContext()
  const [participants, setParticipants] = useState(Array.from(room?.participants.values() ?? []))

  useEffect(() => {
    setParticipants(Array.from(room?.participants.values() ?? []))
    if (!room) return

    const addParticipant = (newParticipant: RemoteParticipant) =>
      setParticipants((state) => [...state, newParticipant])

    const removeParticipant = (removedParticipant: RemoteParticipant) =>
      setParticipants((state) => state.filter((p) => p.sid !== removedParticipant.sid))

    room.on('participantConnected', addParticipant)
    room.on('participantDisconnected', removeParticipant)
    return () => {
      // room.off('participantConnected', addParticipant)
      // room.off('participantDisconnected', removeParticipant)
    }
  }, [room])

  return participants
}

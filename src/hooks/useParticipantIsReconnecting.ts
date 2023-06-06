import { useEffect, useState } from 'react'
import { type Participant } from 'twilio-video'

export default function useParticipantIsReconnecting(participant: Participant) {
  const [isReconnecting, setIsReconnecting] = useState(false)

  useEffect(() => {
    const setReconnecting = () => setIsReconnecting(true)
    const unsetReconnecting = () => setIsReconnecting(false)

    participant.on('reconnecting', setReconnecting)
    participant.on('reconnected', unsetReconnecting)
    return () => {
      // participant.off('reconnecting', setReconnecting)
      // participant.off('reconnected', unsetReconnecting)
    }
  }, [participant])

  return isReconnecting
}

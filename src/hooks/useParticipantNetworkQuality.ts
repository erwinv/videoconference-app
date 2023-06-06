import { useEffect, useState } from 'react'
import { type Participant } from 'twilio-video'

export default function useParticipantNetworkQuality(participant: Participant) {
  const [networkQuality, setNetworkQuality] = useState(participant.networkQualityLevel)

  useEffect(() => {
    const handleChange = (x: number) => setNetworkQuality(x)

    setNetworkQuality(participant.networkQualityLevel)
    participant.on('networkQualityLevelChanged', handleChange)
    return () => {
      // participant.off('networkQualityLevelChanged', handleChange)
    }
  }, [participant])

  return networkQuality
}

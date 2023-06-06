import React from 'react'
import { type LocalParticipant, type RemoteParticipant } from 'twilio-video'
import ParticipantInfo from '~/components/participant/ParticipantInfo'
import ParticipantTracks from '~/components/participant/ParticipantTracks'

interface ParticipantProps {
  participant: LocalParticipant | RemoteParticipant
  videoOnly?: boolean
  enableScreenShare?: boolean
  onClick?: () => void
  isSelected?: boolean
  isLocalParticipant?: boolean
  hideParticipant?: boolean
  isDominantSpeaker?: boolean
  isGalleryView?: boolean
}

export function Participant({
  participant,
  videoOnly,
  enableScreenShare,
  onClick,
  isSelected,
  isLocalParticipant,
  hideParticipant,
  isDominantSpeaker,
  isGalleryView,
}: ParticipantProps) {
  return (
    <ParticipantInfo
      participant={participant}
      onClick={onClick}
      isSelected={isSelected}
      isLocalParticipant={isLocalParticipant}
      hideParticipant={hideParticipant}
      isDominantSpeaker={isDominantSpeaker}
      isGalleryView={isGalleryView}
    >
      <ParticipantTracks
        participant={participant}
        videoOnly={videoOnly}
        enableScreenShare={enableScreenShare}
        isLocalParticipant={isLocalParticipant}
      />
    </ParticipantInfo>
  )
}

export default React.memo(Participant)

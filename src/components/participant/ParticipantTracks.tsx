import { type LocalParticipant, type RemoteParticipant, type Track } from 'twilio-video'
import Publication from '~/components/participant/Publication'
import usePublications, { type Publication as IPublication } from '~/hooks/usePublications'

interface ParticipantTracksProps {
  participant: LocalParticipant | RemoteParticipant
  videoOnly?: boolean
  enableScreenShare?: boolean
  videoPriority?: Track.Priority
  isLocalParticipant?: boolean
}

export default function ParticipantTracks({
  participant,
  videoOnly,
  enableScreenShare,
  videoPriority,
  isLocalParticipant,
}: ParticipantTracksProps) {
  const publications = usePublications(participant)

  let filteredPublications: Array<IPublication>

  if (enableScreenShare && publications.some((p) => p.trackName.includes('screen'))) {
    filteredPublications = publications.filter(
      (p) => p.trackName.includes('screen') || p.kind !== 'video'
    )
  } else {
    filteredPublications = publications.filter((p) => !p.trackName.includes('screen'))
  }

  return (
    <>
      {filteredPublications.map((publication) => (
        <Publication
          key={publication.trackSid}
          publication={publication}
          participant={participant}
          isLocalParticipant={isLocalParticipant}
          videoOnly={videoOnly}
          videoPriority={videoPriority}
        />
      ))}
    </>
  )
}

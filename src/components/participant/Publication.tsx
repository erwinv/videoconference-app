import { type Participant, type Track } from 'twilio-video'
import VideoTrack from '~/components/VideoTrack'
import { type Publication as IPublication } from '~/hooks/usePublications'
import useTrack from '~/hooks/useTrack'

interface PublicationProps {
  publication: IPublication
  participant: Participant
  isLocalParticipant?: boolean
  videoOnly?: boolean
  videoPriority?: Track.Priority
}

export default function Publication({
  publication,
  // isLocalParticipant,
  videoPriority,
}: PublicationProps) {
  const track = useTrack(publication)

  switch (track?.kind) {
    case 'video':
      return <VideoTrack track={track} priority={videoPriority} />
    case 'audio':
    case 'data':
    default:
      return null
  }
}

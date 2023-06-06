import { useEffect, useState } from 'react'
import {
  type LocalAudioTrackPublication,
  type LocalDataTrackPublication,
  type LocalParticipant,
  type LocalVideoTrackPublication,
  type RemoteAudioTrackPublication,
  type RemoteDataTrackPublication,
  type RemoteParticipant,
  type RemoteVideoTrackPublication,
} from 'twilio-video'

export type LocalPublication =
  | LocalAudioTrackPublication
  | LocalDataTrackPublication
  | LocalVideoTrackPublication

export type RemotePublication =
  | RemoteAudioTrackPublication
  | RemoteDataTrackPublication
  | RemoteVideoTrackPublication

export type Publication = LocalPublication | RemotePublication

export default function usePublications(participant: LocalParticipant | RemoteParticipant) {
  const [publications, setPublications] = useState(
    Array.from(participant.tracks.values() as IterableIterator<Publication>)
  )

  useEffect(() => {
    setPublications(Array.from(participant.tracks.values() as IterableIterator<Publication>))

    const publicationAdded = (publication: Publication) =>
      setPublications((prevPublications) => [...prevPublications, publication])
    const publicationRemoved = (publication: Publication) =>
      setPublications((prevPublications) => prevPublications.filter((p) => p !== publication))

    participant.on('trackPublished', publicationAdded)
    participant.on('trackUnpublished', publicationRemoved)
    return () => {
      // participant.off('trackPublished', publicationAdded)
      // participant.off('trackUnpublished', publicationRemoved)
    }
  }, [participant])

  return publications
}

import { useCallback, useRef } from 'react'
import { useDevicesContext } from '~/contexts/Devices'
import { useLocalTracksContext } from '~/contexts/LocalTracks'
import { useRoomContext } from '~/contexts/Room'
import { acquireLocalVideoTrack } from '~/utils/localtracks'

export default function useLocalVideoToggle() {
  const { localVideoTrack, setLocalVideoTrack } = useLocalTracksContext()
  const { camera } = useDevicesContext()
  const { room } = useRoomContext()

  const toggling = useRef(false)

  const toggleCamera = useCallback(async () => {
    if (toggling.current) return
    toggling.current = true

    if (localVideoTrack) {
      const publication = room?.localParticipant.unpublishTrack(localVideoTrack)
      room?.localParticipant.emit('trackUnpublished', publication)
      localVideoTrack.stop()
      setLocalVideoTrack(undefined)
      toggling.current = false
    } else {
      try {
        const localVideoTrack = await acquireLocalVideoTrack(camera)
        room?.localParticipant.publishTrack(localVideoTrack, { priority: 'low' })
        setLocalVideoTrack(localVideoTrack)
      } catch (e) {
        // TODO handle error
        console.error(e)
      } finally {
        toggling.current = false
      }
    }
  }, [camera, localVideoTrack, setLocalVideoTrack, room])

  return {
    isCameraEnabled: Boolean(localVideoTrack),
    toggleCamera,
  }
}

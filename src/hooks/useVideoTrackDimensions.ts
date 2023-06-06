import { useEffect, useState } from 'react'
import { type LocalVideoTrack, type RemoteVideoTrack } from 'twilio-video'

export default function useVideoTrackDimensions(track?: LocalVideoTrack | RemoteVideoTrack) {
  const [dimensions, setDimensions] = useState(track?.dimensions)

  useEffect(() => {
    setDimensions(track?.dimensions)

    if (track) {
      const handleDimensionsChanged = (newTrack: LocalVideoTrack | RemoteVideoTrack) =>
        setDimensions({
          width: newTrack.dimensions.width,
          height: newTrack.dimensions.height,
        })
      track.on('dimensionsChanged', handleDimensionsChanged)
      return () => {
        // track.off('dimensionsChanged', handleDimensionsChanged)
      }
    }
  }, [track])

  return dimensions
}

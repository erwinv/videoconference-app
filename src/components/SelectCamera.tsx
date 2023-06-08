import { FormControl, FormLabel, Option, Select } from '@mui/joy'
import { useEffect, useRef } from 'react'
import { DEFAULT_VIDEO_CONSTRAINTS } from '~/constants'
import { useDevicesContext } from '~/contexts/hooks/useDevices'
import { useLocalTracksContext } from '~/contexts/hooks/useLocalTracks'
import useDeviceInfo from '~/hooks/useDeviceInfo'

export default function SelectCamera() {
  const { cameras } = useDeviceInfo()
  const { camera, setCamera } = useDevicesContext()
  const { localVideoTrack, setLocalVideoTrack } = useLocalTracksContext()
  const switching = useRef(false)

  useEffect(() => {
    if (!localVideoTrack || !camera || switching.current) return
    switching.current = true
    ;(async () => {
      try {
        if (localVideoTrack.mediaStreamTrack.getSettings().deviceId !== camera) {
          await localVideoTrack.restart({
            ...DEFAULT_VIDEO_CONSTRAINTS.desktop,
            deviceId: { exact: camera },
          })
          setLocalVideoTrack(localVideoTrack)
        }
      } finally {
        switching.current = false
      }
    })()
  }, [camera, localVideoTrack, setLocalVideoTrack])

  return (
    <FormControl sx={{ width: '100%' }}>
      <FormLabel>Camera</FormLabel>
      <Select
        size="lg"
        value={camera}
        disabled={cameras.length === 0}
        onChange={(_, value) => setCamera(value ?? undefined)}
      >
        {cameras.map((camera) => (
          <Option key={camera.deviceId} value={camera.deviceId}>
            {camera.label}
          </Option>
        ))}
      </Select>
    </FormControl>
  )
}

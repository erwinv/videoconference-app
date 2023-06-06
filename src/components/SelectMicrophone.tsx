import { FormControl, FormLabel, Option, Select } from '@mui/joy'
import { useEffect, useRef } from 'react'
import { useDevicesContext } from '~/contexts/Devices'
import { useLocalTracksContext } from '~/contexts/LocalTracks'
import useDeviceInfo from '~/hooks/useDeviceInfo'

export default function SelectMicrophone() {
  const { microphones: mics } = useDeviceInfo()
  const { microphone, setMic } = useDevicesContext()
  const { localAudioTrack, setLocalAudioTrack } = useLocalTracksContext()
  const switching = useRef(false)

  useEffect(() => {
    if (!localAudioTrack || !microphone || switching.current) return
    switching.current = true
    ;(async () => {
      try {
        if (localAudioTrack.mediaStreamTrack.getSettings().deviceId !== microphone) {
          await localAudioTrack.restart({ deviceId: { exact: microphone } })
          setLocalAudioTrack(localAudioTrack)
        }
      } finally {
        switching.current = false
      }
    })()
  }, [microphone, localAudioTrack, setLocalAudioTrack])

  return (
    <FormControl sx={{ width: '100%' }}>
      <FormLabel>Microphone</FormLabel>
      <Select
        onChange={(_, value) => setMic(value ?? undefined)}
        value={microphone}
        disabled={mics.length === 0}
      >
        {mics.map((mic) => (
          <Option key={mic.deviceId} value={mic.deviceId}>
            {mic.label}
          </Option>
        ))}
      </Select>
    </FormControl>
  )
}

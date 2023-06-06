import { FormControl, FormLabel, Option, Select } from '@mui/joy'
import { useDevicesContext } from '~/contexts/Devices'
import useDeviceInfo from '~/hooks/useDeviceInfo'

export default function SelectSpeakers() {
  const { speakers: audioOutputDevices } = useDeviceInfo()
  const { speakers, setSpeakers } = useDevicesContext()

  return (
    <FormControl sx={{ width: '100%' }}>
      <FormLabel>Speakers</FormLabel>
      <Select
        placeholder="System default"
        value={speakers}
        disabled={audioOutputDevices.length === 0}
        onChange={(_, value) => setSpeakers(value ?? undefined)}
      >
        {audioOutputDevices.map((speakers) => (
          <Option key={speakers.deviceId} value={speakers.deviceId}>
            {speakers.label}
          </Option>
        ))}
      </Select>
    </FormControl>
  )
}

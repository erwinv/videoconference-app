import { Box, Button, Stack, Typography } from '@mui/joy'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import LocalVideoPreview from '~/components/LocalVideoPreview'
import { useDevicesContext } from '~/contexts/Devices'
import { useLocalTracksContext } from '~/contexts/LocalTracks'
import { useUserContext } from '~/contexts/User'
import { acquireLocalAudioVideoTracks } from '~/utils/localtracks'

interface DeviceSelectionScreenProps {
  joinAction: () => void
  isJoining: boolean
}

export default function DeviceSelectionScreen({
  joinAction,
  isJoining,
}: DeviceSelectionScreenProps) {
  const navigate = useNavigate()
  const hasAcquiredDevices = useRef(false)
  const { microphone, camera } = useDevicesContext()
  const { localAudioTrack, setLocalAudioTrack, setLocalVideoTrack } = useLocalTracksContext()
  const { user } = useUserContext()

  useEffect(() => {
    if (localAudioTrack || hasAcquiredDevices.current) return
    hasAcquiredDevices.current = true
    ;(async () => {
      const { localAudioTrack, localVideoTrack } = await acquireLocalAudioVideoTracks(
        microphone,
        camera
      )
      setLocalAudioTrack(localAudioTrack)
      setLocalVideoTrack(localVideoTrack)
    })()
  }, [microphone, camera, localAudioTrack, setLocalAudioTrack, setLocalVideoTrack])

  return (
    <Stack spacing={2} direction={{ sm: 'row' }} justifyContent="center" alignItems="center">
      <Box sx={{ minWidth: '300px', maxWidth: '500px', flexGrow: 1 }}>
        <LocalVideoPreview identity={user!.uid} />
      </Box>

      <Stack p={2} alignItems="center">
        <Typography level="h5">{isJoining ? 'Joining...' : 'Ready to join?'}</Typography>
        <Stack direction="row" spacing={1} sx={{ m: 1, alignItems: 'center' }}>
          <Button
            variant="plain"
            disabled={isJoining}
            onClick={() => {
              navigate('/')
            }}
          >
            Leave
          </Button>
          <Button loading={isJoining} disabled={!localAudioTrack} onClick={joinAction}>
            Join now
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}

import { Box, Stack } from '@mui/joy'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { connect as connectVideo, type ConnectOptions } from 'twilio-video'
import DeviceSelectionScreen from '~/components/DeviceSelectionScreen'
import VideoAppBar from '~/components/VideoAppBar'
import VideoRoom from '~/components/VideoRoom'
import { useLocalTracksContext } from '~/contexts/hooks/useLocalTracks'
import { useRoomContext } from '~/contexts/hooks/useRoom'
import { useUserContext } from '~/contexts/hooks/useUser'
import { isNotNil } from '~/utils/fns'

const connectionOptions: ConnectOptions = {
  maxAudioBitrate: 128000,
  preferredAudioCodecs: [
    {
      codec: 'opus',
      dtx: true,
    },
  ],
  preferredVideoCodecs: 'auto',
  bandwidthProfile: {
    video: {
      mode: 'collaboration',
      dominantSpeakerPriority: 'standard',
      contentPreferencesMode: 'auto',
      clientTrackSwitchOffControl: 'auto',
    },
  },
  dominantSpeaker: true,
  networkQuality: {
    local: 1,
    remote: 1,
  },
}

export default function VideoApp() {
  const [isJoining, setJoining] = useState(false)
  const { meetingId } = useParams()
  const { getVideoToken } = useUserContext()
  const { localAudioTrack, localVideoTrack } = useLocalTracksContext()
  const { room, setRoom } = useRoomContext()

  useEffect(() => {
    return () => {
      localAudioTrack?.stop()
      localVideoTrack?.stop()
    }
  }, [localAudioTrack, localVideoTrack])

  const joinRoom = useCallback(async () => {
    if (!meetingId) return

    try {
      setJoining(true)
      const token = await getVideoToken(meetingId)
      const joinedRoom = await connectVideo(token, {
        ...connectionOptions,
        tracks: [localAudioTrack, localVideoTrack].filter(isNotNil),
      })
      setRoom(joinedRoom)
    } catch (e) {
      // TODO handle error
      console.error(e)
    } finally {
      setJoining(false)
    }
  }, [localAudioTrack, localVideoTrack, meetingId, getVideoToken, setRoom])

  return (
    <>
      {!room ? (
        <Box
          sx={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Stack flexGrow={1} px={2} justifyContent="center">
            <DeviceSelectionScreen joinAction={joinRoom} isJoining={isJoining} />
          </Stack>
        </Box>
      ) : (
        <Box
          sx={{
            height: '100vh',
            display: 'grid',
            gridTemplateRows: '1fr auto',
          }}
        >
          <Box component="main" sx={{ overflow: 'hidden', background: 'black' }}>
            <VideoRoom />
          </Box>
          <VideoAppBar />
        </Box>
      )}
    </>
  )
}

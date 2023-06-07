import { Avatar, Box, Stack, Typography } from '@mui/joy'
import AudioLevelIndicator from '~/components/AudioLevelIndicator'
import SettingsMenu from '~/components/SettingsMenu'
import VideoTrack from '~/components/VideoTrack'
import ToggleAudioButton from '~/components/buttons/ToggleAudioButton'
import ToggleVideoButton from '~/components/buttons/ToggleVideoButton'
import { useLocalTracksContext } from '~/contexts/LocalTracks'
import { useUserContext } from '~/contexts/User'
import { getInitials, style } from '~/utils/fns'

const styles = {
  container: style({
    position: 'relative',
    height: 0,
    overflow: 'hidden',
    background: 'black',
    paddingTop: `${(9 / 16) * 100}%`,
  }),
  innerContainer: style({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  }),
  avatarContainer: style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'black',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
  }),
  identityContainer: style({
    position: 'absolute',
    top: 0,
    zIndex: 1,
  }),
  identity: style({
    background: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    padding: 1,
    marginBottom: 1,
    display: 'flex',
    alignItems: 'center',
  }),
  mediaControls: style({
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    justifyContent: 'center',
  }),
}

export default function LocalVideoPreview({ identity }: { identity: string }) {
  const { localAudioTrack: audioTrack, localVideoTrack: videoTrack } = useLocalTracksContext()
  const { user } = useUserContext()

  // TODO FIXME move media controls (mute/unmute buttons) and settings menu button outside of this component

  return (
    <Box sx={styles.container}>
      <Box sx={styles.innerContainer}>
        {videoTrack ? (
          <VideoTrack track={videoTrack} />
        ) : (
          <Box sx={styles.avatarContainer}>
            <Avatar src={user?.photoURL ?? undefined} size="lg">
              {getInitials(user?.displayName ?? 'Anonymous Anon')}
            </Avatar>
          </Box>
        )}
      </Box>

      <Box sx={styles.identityContainer}>
        <Box component="span" sx={styles.identity}>
          <AudioLevelIndicator audioTrack={audioTrack} />
          <Typography level="body1" textColor="inherit" component="span">
            {identity}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          zIndex: 2,
          bottom: 0,
          left: 0,
          pl: 1,
          pb: 1,
        }}
      >
        <SettingsMenu />
      </Box>
      <Stack direction="row" width="100%" spacing={1} pb={1} sx={styles.mediaControls}>
        <ToggleAudioButton />
        <ToggleVideoButton />
      </Stack>
    </Box>
  )
}

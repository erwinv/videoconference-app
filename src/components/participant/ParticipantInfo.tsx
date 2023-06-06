import {
  AccountCircle as AvatarIcon,
  PushPin as PinIcon,
  ScreenShare as ScreenShareIcon,
} from '@mui/icons-material'
import { Avatar, Box, Typography } from '@mui/joy'
import { type ReactNode } from 'react'
import { type LocalParticipant, type RemoteParticipant } from 'twilio-video'
import AudioLevelIndicator from '~/components/AudioLevelIndicator'
import ParticipantNetworkQuality from '~/components/participant/ParticipantNetworkQuality'
import { useUserContext } from '~/contexts/User'
import useIsVideoTrackSwitchedOff from '~/hooks/useIsTrackSwitchedOff'
import useParticipantIsReconnecting from '~/hooks/useParticipantIsReconnecting'
import usePublications from '~/hooks/usePublications'
import useTrack from '~/hooks/useTrack'
import { isAudioPublication, isVideoPublication, style } from '~/utils/fns'

const borderWidth = 2
const sidebarMobileHeight = 90
const participantBorderWidth = 2
const galleryViewBackgroundColor = '#121C2D'

const styles = {
  container: style((theme) => ({
    position: 'relative',
    // display: 'flex',
    // alignItems: 'center',
    height: 0,
    overflow: 'hidden',
    // marginBottom: '0.5em',
    '& video': {
      objectFit: 'contain !important',
    },
    borderRadius: '4px',
    border: `${participantBorderWidth}px solid rgb(245, 248, 255)`,
    paddingTop: `calc(${(9 / 16) * 100}% - ${participantBorderWidth}px)`,
    background: 'black',
    [theme.breakpoints.down('sm')]: {
      height: sidebarMobileHeight,
      width: `${(sidebarMobileHeight * 16) / 9}px`,
      marginRight: '8px',
      marginBottom: '0',
      fontSize: '12px',
      paddingTop: `${sidebarMobileHeight - 2}px`,
    },
  })),
  innerContainer: style({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  }),
  infoContainer: style({
    position: 'absolute',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    background: 'transparent',
    top: 0,
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
  reconnectingContainer: style({
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(40, 42, 43, 0.75)',
    zIndex: 1,
  }),
  screenShareIconContainer: style({
    background: 'rgba(0, 0, 0, 0.5)',
    padding: '0.18em 0.3em',
    marginRight: '0.3em',
    display: 'flex',
    '& path': {
      fill: 'white',
    },
  }),
  identity: style({
    background: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    padding: '0.18em 0.3em 0.18em 0',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
  }),
  infoRowBottom: style({
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
  }),
  typography: style((theme) => ({
    color: 'white',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.75rem',
    },
  })),
  hideParticipant: style({
    display: 'none',
  }),
  cursorPointer: style({
    cursor: 'pointer',
  }),
  galleryView: style((theme) => ({
    border: `${participantBorderWidth}px solid ${galleryViewBackgroundColor}`,
    borderRadius: '8px',
    [theme.breakpoints.down('sm')]: {
      position: 'relative',
      width: '100%',
      height: '100%',
      padding: '0',
      fontSize: '12px',
      margin: '0',
      '& video': {
        objectFit: 'cover !important',
      },
    },
  })),
  dominantSpeaker: style({
    border: `solid ${borderWidth}px #7BEAA5`,
  }),
}

interface ParticipantInfoProps {
  participant: LocalParticipant | RemoteParticipant
  children: ReactNode
  onClick?: () => void
  isSelected?: boolean
  isLocalParticipant?: boolean
  hideParticipant?: boolean
  isDominantSpeaker?: boolean
  isGalleryView?: boolean
}

export default function ParticipantInfo({
  participant,
  onClick,
  isSelected,
  children,
  isLocalParticipant,
  hideParticipant,
  isDominantSpeaker,
  isGalleryView,
}: ParticipantInfoProps) {
  const { user } = useUserContext()
  const publications = usePublications(participant)

  const audioPublication = publications.find(isAudioPublication)
  const videoPublication = publications
    .filter(isVideoPublication)
    .find((p) => !p.trackName.includes('screen'))

  const isVideoEnabled = Boolean(videoPublication)
  const isScreenShareEnabled = publications.some(
    (p) => isVideoPublication(p) && p.trackName.includes('screen')
  )

  const videoTrack = useTrack(videoPublication)
  const isVideoSwitchedOff = useIsVideoTrackSwitchedOff(videoTrack)

  const audioTrack = useTrack(audioPublication)
  const isParticipantReconnecting = useParticipantIsReconnecting(participant)

  return (
    <Box
      sx={(theme) => ({
        ...styles.container(theme),
        ...(hideParticipant ? styles.hideParticipant : {}),
        ...(onClick ? styles.cursorPointer : {}),
        ...(isDominantSpeaker ? styles.dominantSpeaker : {}),
        ...(isGalleryView ? styles.galleryView(theme) : {}),
      })}
      onClick={onClick}
    >
      <Box sx={styles.infoContainer}>
        <ParticipantNetworkQuality
          participant={participant}
          sx={{ background: 'rgba(0, 0, 0, 0.5)' }}
        />
        <Box sx={styles.infoRowBottom}>
          {isScreenShareEnabled && (
            <Box component="span" sx={styles.screenShareIconContainer}>
              <ScreenShareIcon />
            </Box>
          )}
          <Box component="span" sx={styles.identity}>
            <AudioLevelIndicator audioTrack={audioTrack} />
            <Typography level="body1" component="span" textColor="white">
              {participant.identity}
              {isLocalParticipant && ' (You)'}
            </Typography>
          </Box>
        </Box>
        <div>{isSelected && <PinIcon />}</div>
      </Box>
      <Box sx={styles.innerContainer}>
        {(!isVideoEnabled || isVideoSwitchedOff) && (
          <Box sx={styles.avatarContainer}>
            {isLocalParticipant && user?.photoURL ? (
              <Avatar src={user.photoURL} size="lg" />
            ) : (
              <AvatarIcon sx={{ color: 'white' }} />
            )}
          </Box>
        )}
        {isParticipantReconnecting && (
          <Box sx={styles.reconnectingContainer}>
            <Typography level="body1" textColor="white">
              Reconnecting...
            </Typography>
          </Box>
        )}
        {children}
      </Box>
    </Box>
  )
}

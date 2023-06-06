import { Box } from '@mui/joy'
import type { SxProps } from '@mui/joy/styles/types'
import { type Participant } from 'twilio-video'
import useParticipantNetworkQuality from '~/hooks/useParticipantNetworkQuality'
import { style } from '~/utils/fns'

const styles = {
  outerContainer: style({
    width: '2em',
    height: '2em',
    padding: '1em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
  }),
  innerContainer: style({
    display: 'flex',
    alignItems: 'flex-end',
    '& div': {
      width: '2px',
      marginRight: '1px',
      '&:not(:last-child)': {
        borderRight: 'none',
      },
    },
  }),
}

const STEP = 3
const BARS_ARRAY = [0, 1, 2, 3, 4]

interface ParticipantNetworkQualityProps {
  participant: Participant
  sx?: SxProps
}

export default function ParticipantNetworkQuality({
  participant,
  sx = {},
}: ParticipantNetworkQualityProps) {
  const networkQualityLevel = useParticipantNetworkQuality(participant)

  if (networkQualityLevel === null) return null

  return (
    <Box sx={{ ...styles.outerContainer, ...sx }}>
      <Box sx={styles.innerContainer}>
        {BARS_ARRAY.map((level) => (
          <div
            key={level}
            style={{
              height: `${STEP * (level + 1)}px`,
              background: networkQualityLevel > level ? 'white' : 'rgba(255, 255, 255, 0.2)',
            }}
          />
        ))}
      </Box>
    </Box>
  )
}

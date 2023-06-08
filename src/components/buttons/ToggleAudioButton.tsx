import { MicOff as MicOffIcon, Mic as MicOnIcon } from '@mui/icons-material'
import { IconButton } from '@mui/joy'
import { useCallback } from 'react'
import { useLocalTracksContext } from '~/contexts/hooks/useLocalTracks'
import useIsTrackEnabled from '~/hooks/useIsTrackEnabled'

interface ToggleAudioButtonProps {
  disabled?: boolean
}

export default function ToggleAudioButton({ disabled = false }: ToggleAudioButtonProps) {
  const { localAudioTrack: audioTrack } = useLocalTracksContext()
  const hasAudioTrack = Boolean(audioTrack)

  const isMicEnabled = useIsTrackEnabled(audioTrack)
  const toggleAudioEnabled = useCallback(() => {
    if (audioTrack) {
      if (audioTrack.isEnabled) {
        audioTrack.disable()
      } else {
        audioTrack.enable()
      }
    }
  }, [audioTrack])

  return (
    <IconButton
      aria-label="toggle microphone on/off"
      disabled={!hasAudioTrack || disabled}
      variant={!isMicEnabled ? 'solid' : 'soft'}
      color={!isMicEnabled ? 'danger' : 'neutral'}
      sx={{ opacity: !isMicEnabled ? 1 : 0.5 }}
      onClick={toggleAudioEnabled}
    >
      {isMicEnabled ? <MicOnIcon /> : <MicOffIcon />}
    </IconButton>
  )
}

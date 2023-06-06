import { Videocam as VideocamIcon, VideocamOff as VideocamOffIcon } from '@mui/icons-material'
import { IconButton } from '@mui/joy'
import { useCallback, useRef } from 'react'
import useLocalVideoToggle from '~/contexts/hooks/useLocalVideoToggle'
import useDeviceInfo from '~/hooks/useDeviceInfo'

interface ToggleVideoButtonProps {
  disabled?: boolean
}

export default function ToggleVideoButton({ disabled = false }: ToggleVideoButtonProps) {
  const { isCameraEnabled, toggleCamera } = useLocalVideoToggle()
  const lastClickTimeRef = useRef(0)
  const { hasCameras: hasVideoInputDevices } = useDeviceInfo()

  const toggleVideo = useCallback(() => {
    if (Date.now() - lastClickTimeRef.current > 500) {
      lastClickTimeRef.current = Date.now()
      toggleCamera()
    }
  }, [toggleCamera])

  return (
    <IconButton
      aria-label="toggle camera on/off"
      disabled={!hasVideoInputDevices || disabled}
      variant={!isCameraEnabled ? 'solid' : 'soft'}
      color={!isCameraEnabled ? 'danger' : 'neutral'}
      sx={{ opacity: !isCameraEnabled ? 1 : 0.5 }}
      onClick={toggleVideo}
    >
      {isCameraEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
    </IconButton>
  )
}

import { CallEnd as CallEndIcon } from '@mui/icons-material'
import { Button } from '@mui/joy'
import { useRoomContext } from '~/contexts/Room'

export default function EndCallButton() {
  const { room } = useRoomContext()

  return (
    <Button variant="solid" color="danger" onClick={() => room?.disconnect()}>
      <CallEndIcon />
    </Button>
  )
}

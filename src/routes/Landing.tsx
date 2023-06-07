import { Button, Container, Input, Sheet, Stack } from '@mui/joy'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()
  const [meetingId, setMeetingId] = useState('abc-defg-hij')

  return (
    <Container maxWidth="xs">
      <Sheet variant="outlined" sx={{ mt: 8, p: 2, borderRadius: 16 }}>
        <Stack sx={{ gap: 2 }}>
          <Input value={meetingId} onChange={(ev) => setMeetingId(ev.currentTarget.value)} />
          <Button disabled={!meetingId} onClick={() => navigate(`/room/${meetingId}`)}>
            Go meet
          </Button>
        </Stack>
      </Sheet>
    </Container>
  )
}

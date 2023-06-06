import { VolumeUp as VolumeUpIcon } from '@mui/icons-material'
import { Box, Button, Divider, Modal, ModalDialog, Stack, Typography } from '@mui/joy'
import AudioLevelIndicator from '~/components/AudioLevelIndicator'
import SelectCamera from '~/components/SelectCamera'
import SelectMicrophone from '~/components/SelectMicrophone'
import SelectSpeakers from '~/components/SelectSpeakers'
import VideoTrack from '~/components/VideoTrack'
import { useLocalTracksContext } from '~/contexts/LocalTracks'
// import useNoiseCancellation from '~/contexts/hooks/useNoiseCancellation'

interface DeviceSelectionDialogProps {
  open: boolean
  onClose: () => void
}

export default function DeviceSelectionDialog({ open, onClose }: DeviceSelectionDialogProps) {
  const { localAudioTrack, localVideoTrack } = useLocalTracksContext()
  // const { isNoiseCancellationInstalled, isNoiseCancellationEnabled, toggleNoiseCancellation } =
  //   useNoiseCancellation()

  return (
    <Modal keepMounted open={open} onClose={onClose}>
      <ModalDialog>
        <Typography level="h5" sx={{ mb: 1 }}>
          Audio and Video Settings
        </Typography>
        <Divider />
        <Stack minWidth="320px" spacing={2}>
          <Box
            sx={{
              display: 'grid',
              gap: '1rem',
              gridTemplateColumns: '3fr 1fr',
              alignItems: 'end',
              justifyItems: 'center',
              pt: 1,
            }}
          >
            <SelectCamera />
            {localVideoTrack ? (
              <Box sx={{ height: '48px' }}>
                <VideoTrack track={localVideoTrack} />
              </Box>
            ) : (
              <div />
            )}
            <SelectMicrophone />
            <Box pb="0.1em">
              <AudioLevelIndicator audioTrack={localAudioTrack} color="black" />
            </Box>
            {/* {isNoiseCancellationInstalled && (
              <>
                <Typography
                  endDecorator={
                    <Tooltip title="Suppress background noise picked up by your microphone.">
                      <InfoIcon />
                    </Tooltip>
                  }
                  sx={{ justifySelf: 'end' }}
                >
                  Noise cancellation
                </Typography>
                <Switch checked={isNoiseCancellationEnabled} onClick={toggleNoiseCancellation} />
              </>
            )} */}
            <SelectSpeakers />
            {/* TODO play test sound */}
            <Button startDecorator={<VolumeUpIcon />}>Test</Button>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={onClose}>Done</Button>
          </Box>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}

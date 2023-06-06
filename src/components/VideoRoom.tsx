import { Box } from '@mui/joy'
import { GalleryView } from '~/components/layouts/GalleryView'
import { ParticipantAudioTracks } from '~/components/ParticipantAudioTracks'

const sidebarWidth = 300
const sidebarMobileHeight = 90
const sidebarMobilePadding = 8
const participantBorderWidth = 2

export default function VideoRoom() {
  return (
    <>
      <ParticipantAudioTracks />
      <Box
        sx={(theme) => {
          const totalMobileSidebarHeight = `${
            sidebarMobileHeight + sidebarMobilePadding * 2 + participantBorderWidth
          }px`
          return {
            position: 'relative',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: `1fr ${sidebarWidth}px`,
            gridTemplateRows: '100%',
            [theme.breakpoints.down('sm')]: {
              gridTemplateColumns: `100%`,
              gridTemplateRows: `calc(100% - ${totalMobileSidebarHeight}) ${totalMobileSidebarHeight}`,
            },
          }
        }}
      >
        <GalleryView />
      </Box>
    </>
  )
}

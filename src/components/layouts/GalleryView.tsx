import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { Box, IconButton } from '@mui/joy'
// import { Pagination } from '@mui/material'
import Participant from '~/components/participant/Participant'
import { useRoomContext } from '~/contexts/Room'
import useDominantSpeaker from '~/contexts/hooks/useDominantSpeaker'
import useGalleryViewParticipants from '~/contexts/hooks/useGalleryViewParticipants'
import useGalleryViewLayout from '~/hooks/useGalleryViewLayout'
import { usePagination } from '~/hooks/usePagination'
import { style } from '~/utils/fns'

export const GALLERY_VIEW_ASPECT_RATIO = 9 / 16 // 16:9
export const GALLERY_VIEW_MARGIN = 3
export const CONTAINER_GUTTER = '50px'
export const galleryViewBackgroundColor = '#121C2D'

const styles = {
  container: style({
    background: galleryViewBackgroundColor,
    position: 'relative',
    gridArea: '1 / 1 / 2 / 3',
  }),
  participantContainer: style({
    position: 'absolute',
    display: 'flex',
    top: CONTAINER_GUTTER,
    right: CONTAINER_GUTTER,
    bottom: CONTAINER_GUTTER,
    left: CONTAINER_GUTTER,
    margin: '0 auto',
    alignContent: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }),
  buttonContainer: style({
    position: 'absolute',
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),

  buttonContainerLeft: style({
    right: `calc(100% - ${CONTAINER_GUTTER})`,
    left: 0,
  }),
  buttonContainerRight: style({
    right: 0,
    left: `calc(100% - ${CONTAINER_GUTTER})`,
  }),
  pagination: style({
    '& .MuiPaginationItem-root': {
      color: 'white',
    },
  }),
  paginationButton: style({
    color: 'black',
    background: 'rgba(255, 255, 255, 0.8)',
    width: '40px',
    height: '40px',
    '&:hover': {
      background: 'rgba(255, 255, 255)',
    },
  }),
  paginationContainer: style({
    position: 'absolute',
    top: `calc(100% - ${CONTAINER_GUTTER})`,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
}

export function GalleryView() {
  const maxGalleryViewParticipants = 6
  const { room } = useRoomContext()
  const galleryViewParticipants = useGalleryViewParticipants()
  const dominantSpeaker = useDominantSpeaker(true)

  const { paginatedParticipants, setCurrentPage, currentPage, totalPages } = usePagination([
    room!.localParticipant,
    ...galleryViewParticipants,
  ])

  const galleryViewLayoutParticipantCount =
    currentPage === 1 ? paginatedParticipants.length : maxGalleryViewParticipants
  const { participantVideoWidth, containerRef } = useGalleryViewLayout(
    galleryViewLayoutParticipantCount
  )

  const participantWidth = `${participantVideoWidth}px`
  const participantHeight = `${Math.floor(participantVideoWidth * GALLERY_VIEW_ASPECT_RATIO)}px`

  return (
    <Box sx={styles.container}>
      <Box sx={{ ...styles.buttonContainer, ...styles.buttonContainerLeft }}>
        {!(currentPage === 1) && (
          <IconButton
            sx={styles.paginationButton}
            onClick={() => setCurrentPage((page) => page - 1)}
          >
            <ArrowBack />
          </IconButton>
        )}
      </Box>
      <Box sx={{ ...styles.buttonContainer, ...styles.buttonContainerRight }}>
        {!(currentPage === totalPages) && (
          <IconButton
            sx={styles.paginationButton}
            onClick={() => setCurrentPage((page) => page + 1)}
          >
            <ArrowForward />
          </IconButton>
        )}
      </Box>
      <Box sx={styles.paginationContainer}>
        {/* {totalPages > 1 && (
          <Pagination
            sx={styles.pagination}
            page={currentPage}
            count={totalPages}
            onChange={(_, value) => setCurrentPage(value)}
            shape="rounded"
            color="primary"
            size="small"
            hidePrevButton
            hideNextButton
          />
        )} */}
      </Box>
      <Box sx={styles.participantContainer} ref={containerRef}>
        {paginatedParticipants.map((participant) => (
          <Box
            key={participant.sid}
            style={{
              width: participantWidth,
              height: participantHeight,
              margin: GALLERY_VIEW_MARGIN,
            }}
          >
            <Participant
              participant={participant}
              isLocalParticipant={participant === room!.localParticipant}
              isDominantSpeaker={participant === dominantSpeaker}
              isGalleryView={true}
            />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

// import { useMediaQuery } from '@mui/material'
import { Box } from '@mui/joy'
import { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import { type LocalParticipant, type RemoteParticipant } from 'twilio-video'
import { galleryViewBackgroundColor } from '~/components/layouts/GalleryView'
import Participant from '~/components/participant/Participant'
import { useRoomContext } from '~/contexts/Room'
import useDominantSpeaker from '~/contexts/hooks/useDominantSpeaker'
import useGalleryViewParticipants from '~/contexts/hooks/useGalleryViewParticipants'
import { style } from '~/utils/fns'

const styles = {
  participantContainer: style({
    background: galleryViewBackgroundColor,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: '100%',
    '& .swiper': {
      height: '100%',
      '--swiper-pagination-bullet-inactive-color': 'white',
    },
    '& .swiper-wrapper': {
      height: '100%',
    },
    '& .swiper-pagination.swiper-pagination-bullets': {
      bottom: '5px',
    },
  }),
  isPaginationActive: style({
    '& .swiper-slide': {
      // To leave room for the pagination indicators:
      height: 'calc(100% - 21px)',
      paddingBottom: '21px',
    },
  }),
  swiperSlide: style({
    display: 'flex',
    flexWrap: 'wrap',
    alignSelf: 'center',
    alignContent: 'flex-start',
  }),
}

export function MobileGalleryView() {
  const isMobileLandscape = false
  // const isMobileLandscape = useMediaQuery('screen and (orientation: landscape)')
  const { room } = useRoomContext()
  const mobileGalleryViewParticipants = useGalleryViewParticipants(true)
  const dominantSpeaker = useDominantSpeaker(true)
  const remoteParticipantCount = mobileGalleryViewParticipants.length

  const pages = [[]] as Array<Array<LocalParticipant | RemoteParticipant>>
  // Add the localParticipant to the front of the array to ensure they are always the first participant:
  pages[0].push(room!.localParticipant)

  for (let i = 0; i < remoteParticipantCount; i++) {
    const pageNumber = Math.floor(i / 6)
    if (!pages[pageNumber]) {
      pages[pageNumber] = []
    }
    // Each page should have a max of 6 participants:
    if (pages[pageNumber].length < 6) {
      pages[pageNumber].push(mobileGalleryViewParticipants[i])
    } else {
      pages[pageNumber + 1] = [mobileGalleryViewParticipants[i]]
    }
  }

  const portraitParticipantVideoStyles = style({
    width: remoteParticipantCount < 3 ? '100%' : '50%',
    // The height of each participant's video is determined by the number of participants on the gallery view
    // page. Here the array indices represent a remoteParticipantCount. If the count is 4 or greater,
    // the height will be 33.33%
    height: ['100%', '50%', '33.33%', '50%', '33.33%'][Math.min(remoteParticipantCount, 4)],
    padding: '0.2em',
    boxSizing: 'border-box',
  })

  const landscapeParticipantVideoStyles = style({
    height: remoteParticipantCount < 3 ? '100%' : '50%',
    width: ['100%', '50%', '33.33%', '50%', '33.33%'][Math.min(remoteParticipantCount, 4)],
    padding: '0.2em 0.1em',
    boxSizing: 'border-box',
  })

  return (
    <Box
      sx={{
        ...styles.participantContainer,
        ...(remoteParticipantCount > 5 ? styles.isPaginationActive : {}),
      }}
    >
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        {pages.map((page, i) => (
          <SwiperSlide key={i} style={styles.swiperSlide}>
            {page.map((participant) => (
              <Box
                data-test-id="participantContainer"
                sx={
                  isMobileLandscape
                    ? landscapeParticipantVideoStyles
                    : portraitParticipantVideoStyles
                }
                key={participant.sid}
              >
                <Participant
                  participant={participant}
                  isLocalParticipant={room!.localParticipant === participant}
                  isDominantSpeaker={dominantSpeaker === participant}
                  isGalleryView={true}
                />
              </Box>
            ))}
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}

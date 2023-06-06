import { Box, Stack } from '@mui/joy'
// import { AppBar, Toolbar } from '@mui/material'
import EndCallButton from '~/components/buttons/EndCallButton'
import ToggleAudioButton from '~/components/buttons/ToggleAudioButton'
import ToggleVideoButton from '~/components/buttons/ToggleVideoButton'
import useRoomState from '~/contexts/hooks/useRoomState'

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     container: {
//       backgroundColor: theme.palette.background.default,
//       bottom: 0,
//       left: 0,
//       right: 0,
//       height: `${theme.footerHeight}px`,
//       position: 'fixed',
//       display: 'flex',
//       padding: '0 1.43em',
//       zIndex: 10,
//       [theme.breakpoints.down('sm')]: {
//         height: `${theme.mobileFooterHeight}px`,
//         padding: 0,
//       },
//     },
//     screenShareBanner: {
//       position: 'fixed',
//       zIndex: 8,
//       bottom: `${theme.footerHeight}px`,
//       left: 0,
//       right: 0,
//       height: '104px',
//       background: 'rgba(0, 0, 0, 0.5)',
//       '& h6': {
//         color: 'white',
//       },
//       '& button': {
//         background: 'white',
//         color: theme.brand,
//         border: `2px solid ${theme.brand}`,
//         margin: '0 2em',
//         '&:hover': {
//           color: '#600101',
//           border: `2px solid #600101`,
//           background: '#FFE9E7',
//         },
//       },
//     },
//     hideMobile: {
//       display: 'initial',
//       [theme.breakpoints.down('sm')]: {
//         display: 'none',
//       },
//     },
//   })
// )

export default function VideoAppBar() {
  // const { isSharingScreen, toggleScreenShare } = useVideoContext()
  const roomState = useRoomState()
  const isReconnecting = roomState === 'reconnecting'

  return (
    <>
      {/* {isSharingScreen && (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          // className={classes.screenShareBanner}
        >
          <Typography variant="h6">You are sharing your screen</Typography>
          <Button onClick={() => toggleScreenShare()}>Stop Sharing</Button>
        </Grid>
      )} */}
      <Box position="static" component="footer" sx={{ top: 'auto', bottom: 0 }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
          <div />

          <Stack direction="row" spacing={1}>
            <ToggleAudioButton disabled={isReconnecting} />
            <ToggleVideoButton disabled={isReconnecting} />
            {/* {!isSharingScreen && !isMobile && (
                <ToggleScreenShareButton disabled={isReconnecting} />
              )} */}
            {/* {import.meta.env.VITE_DISABLE_TWILIO_CONVERSATIONS !== 'true' && (
                <ToggleChatButton />
              )} */}
          </Stack>
          {/* <Menu /> */}

          <EndCallButton />
        </Stack>
      </Box>
    </>
  )
}

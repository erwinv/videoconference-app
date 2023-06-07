import { Outlet, createBrowserRouter } from 'react-router-dom'
import { DevicesProvider } from './contexts/Devices'
import { LocalTracksProvider } from './contexts/LocalTracks'
import { RoomProvider } from './contexts/Room'
import { UserProvider } from './contexts/User'
import Landing from './routes/Landing'
import VideoApp from './routes/VideoApp'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <UserProvider>
        <DevicesProvider>
          <RoomProvider>
            <LocalTracksProvider>
              <Outlet />
            </LocalTracksProvider>
          </RoomProvider>
        </DevicesProvider>
      </UserProvider>
    ),
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'room/:meetingId',
        element: <VideoApp />,
      },
    ],
  },
])

export default router

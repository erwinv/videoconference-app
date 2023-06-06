import { Settings as SettingsIcon } from '@mui/icons-material'
import { IconButton, Menu, MenuItem, Typography } from '@mui/joy'
import { useState } from 'react'
import DeviceSelectionDialog from '~/components/dialogs/DeviceSelectionDialog'

export default function SettingsMenu() {
  // const [aboutOpen, setAboutOpen] = useState(false)
  const [deviceSettingsOpen, setDeviceSettingsOpen] = useState(false)

  const [anchorEl, setAnchorEl] = useState<HTMLElement>()

  return (
    <>
      <IconButton
        variant="soft"
        color="neutral"
        onClick={(ev) => setAnchorEl(ev.currentTarget)}
        sx={{ opacity: 0.5 }}
      >
        <SettingsIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(undefined)}>
        {/* <MenuItem onClick={() => setAboutOpen(true)}>
          <Typography level="body1">About</Typography>
        </MenuItem> */}
        <MenuItem onClick={() => setDeviceSettingsOpen(true)}>
          <Typography level="body1">Audio and Video Settings</Typography>
        </MenuItem>
        {/* {roomType !== 'peer-to-peer' && roomType !== 'go' && (
          <MenuItem onClick={() => setConnectionSettingsOpen(true)}>
            <Typography level="body1">Connection Settings</Typography>
          </MenuItem>
        )} */}
      </Menu>
      {/* <AboutDialog
        open={aboutOpen}
        onClose={() => {
          setAboutOpen(false)
          setAnchorEl(undefined)
        }}
      /> */}
      <DeviceSelectionDialog
        open={deviceSettingsOpen}
        onClose={() => {
          setDeviceSettingsOpen(false)
          setAnchorEl(undefined)
        }}
      />
      {/* <ConnectionOptionsDialog
        open={connectionSettingsOpen}
        onClose={() => {
          setConnectionSettingsOpen(false)
          setAnchorEl(null)
        }}
      /> */}
    </>
  )
}

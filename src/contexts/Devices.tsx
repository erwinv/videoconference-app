import { noop } from 'lodash-es'
import { createContext, type PropsWithChildren } from 'react'
import { useDevicesState } from '~/contexts/hooks/useDevices'

const initialDevicesState: ReturnType<typeof useDevicesState> = {
  microphone: '',
  camera: '',
  speakers: '',
  setMic: noop,
  setCamera: noop,
  setSpeakers: noop,
}

export const DevicesContext = createContext(initialDevicesState)

export function DevicesProvider({ children }: PropsWithChildren) {
  const devicesState = useDevicesState()
  return <DevicesContext.Provider value={devicesState}>{children}</DevicesContext.Provider>
}

import { useCallback, useContext, useEffect, useState } from 'react'
import { SELECTED_CAMERA, SELECTED_MICROPHONE, SELECTED_SPEAKERS } from '~/constants'
import { DevicesContext } from '~/contexts/Devices'
import { getDeviceInfo } from '~/utils/mediadevices'

export function useDevicesState() {
  const [{ microphone, camera, speakers }, setDevicesState] = useState({
    microphone: window.localStorage.getItem(SELECTED_MICROPHONE) ?? undefined,
    camera: window.localStorage.getItem(SELECTED_CAMERA) ?? undefined,
    speakers: window.localStorage.getItem(SELECTED_SPEAKERS) ?? undefined,
  })

  const setMic = useCallback((microphone = 'default') => {
    window.localStorage.setItem(SELECTED_MICROPHONE, microphone)
    setDevicesState((state) => ({
      ...state,
      microphone,
    }))
  }, [])
  const setCamera = useCallback((camera = 'default') => {
    window.localStorage.setItem(SELECTED_CAMERA, camera)
    setDevicesState((state) => ({
      ...state,
      camera,
    }))
  }, [])
  const setSpeakers = useCallback((speakers = 'default') => {
    window.localStorage.setItem(SELECTED_SPEAKERS, speakers)
    setDevicesState((state) => ({
      ...state,
      speakers,
    }))
  }, [])

  useEffect(() => {
    ;(async () => {
      const {
        microphones,
        cameras,
        speakers: speakersList,
        hasMics,
        hasCameras,
        hasSpeakers,
      } = await getDeviceInfo()
      if (!microphone && hasMics) {
        setMic(microphones.at(0)!.deviceId)
      }
      if (!camera && hasCameras) {
        setCamera(cameras.at(0)!.deviceId)
      }
      if (!speakers && hasSpeakers) {
        setSpeakers(speakersList.at(0)!.deviceId)
      }
    })()
  }, [microphone, camera, speakers, setMic, setCamera, setSpeakers])

  return {
    microphone,
    camera,
    speakers,
    setMic,
    setCamera,
    setSpeakers,
  }
}

export function useDevicesContext() {
  return useContext(DevicesContext)
}

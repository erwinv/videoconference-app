import { useEffect, useState } from 'react'
import { getDeviceInfo } from '~/utils/mediadevices'

export default function useDeviceInfo() {
  const [deviceInfo, setDeviceInfo] = useState<Awaited<ReturnType<typeof getDeviceInfo>>>({
    microphones: [],
    cameras: [],
    speakers: [],
    hasMics: false,
    hasCameras: false,
    hasSpeakers: false,
  })

  useEffect(() => {
    const getDevices = async () => {
      setDeviceInfo(await getDeviceInfo())
    }

    getDevices()

    navigator.mediaDevices.addEventListener('devicechange', getDevices)
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', getDevices)
    }
  }, [])

  return deviceInfo
}

export async function getDeviceInfo() {
  const devices = await navigator.mediaDevices.enumerateDevices()

  return {
    microphones: devices.filter((device) => device.kind === 'audioinput'),
    cameras: devices.filter((device) => device.kind === 'videoinput'),
    speakers: devices.filter((device) => device.kind === 'audiooutput'),
    hasMics: devices.some((device) => device.kind === 'audioinput'),
    hasCameras: devices.some((device) => device.kind === 'videoinput'),
    hasSpeakers: devices.some((device) => device.kind === 'audiooutput'),
  }
}

export async function isPermissionDenied(name: PermissionName | 'camera' | 'microphone') {
  try {
    const result = await navigator.permissions.query({
      name: name as PermissionName,
    })
    return result.state === 'denied'
  } catch {
    return false
  }
}

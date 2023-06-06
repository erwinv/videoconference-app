import { createLocalAudioTrack, createLocalTracks, createLocalVideoTrack } from 'twilio-video'
import { DEFAULT_VIDEO_CONSTRAINTS } from '~/constants'
import { isLocalAudio, isLocalVideo } from '~/utils/fns'
import { getDeviceInfo, isPermissionDenied } from '~/utils/mediadevices'

export async function acquireLocalAudioTrack(selectedMic?: string) {
  const { hasMics } = await getDeviceInfo()

  if (!hasMics) throw new Error('NoMicrophone')

  const isMicPermissionDenied = await isPermissionDenied('microphone')
  if (hasMics && isMicPermissionDenied) {
    throw new Error('MicrophonePermissionsDenied')
  }

  const audioTrack = await createLocalAudioTrack({
    deviceId: {
      ideal: selectedMic,
    },
    // noiseCancellationOptions: {
    //   sdkAssetsPath: '/krisp',
    //   vendor: 'krisp',
    // },
  })

  return audioTrack
}

export async function acquireLocalVideoTrack(selectedCamera?: string) {
  const { hasCameras } = await getDeviceInfo()

  if (!hasCameras) throw new Error('NoCamera')

  const isCameraPermissionDenied = await isPermissionDenied('camera')
  if (hasCameras && isCameraPermissionDenied) {
    throw new Error('CameraPermissionsDenied')
  }

  const videoTrack = await createLocalVideoTrack({
    ...DEFAULT_VIDEO_CONSTRAINTS.desktop,
    deviceId: {
      ideal: selectedCamera,
    },
    name: `camera-${Date.now()}`,
  })

  return videoTrack
}

export async function acquireLocalAudioVideoTracks(selectedMic?: string, selectedCamera?: string) {
  const { hasMics, hasCameras } = await getDeviceInfo()

  if (!hasMics && !hasCameras) throw new Error('NoMicrophoneAndCamera')

  const isCameraPermissionDenied = await isPermissionDenied('camera')
  const isMicPermissionDenied = await isPermissionDenied('microphone')
  if (hasCameras && isCameraPermissionDenied) {
    throw new Error('CameraPermissionsDenied')
  }
  if (hasMics && isMicPermissionDenied) {
    throw new Error('MicrophonePermissionsDenied')
  }

  const tracks = await createLocalTracks({
    video: hasCameras && {
      ...DEFAULT_VIDEO_CONSTRAINTS.desktop,
      deviceId: {
        ideal: selectedCamera,
      },
      name: `camera-${Date.now()}`,
    },
    audio: hasMics && {
      deviceId: {
        ideal: selectedMic,
      },
      // noiseCancellationOptions: {
      //   sdkAssetsPath: '/krisp',
      //   vendor: 'krisp',
      // },
    },
  })

  const videoTrack = tracks.find(isLocalVideo)
  const audioTrack = tracks.find(isLocalAudio)

  return {
    localAudioTrack: audioTrack,
    localVideoTrack: videoTrack,
  }
}

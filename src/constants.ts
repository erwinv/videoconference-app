export const DEFAULT_VIDEO_CONSTRAINTS = {
  mobile: {
    aspectRatio: { ideal: 3 / 4 },
    height: { ideal: 720 },
    frameRate: { ideal: 30 },
  } as MediaTrackConstraints,
  desktop: {
    aspectRatio: { ideal: 4 / 3 },
    height: { ideal: 720 },
    frameRate: { ideal: 30 },
  } as MediaTrackConstraints,
}

export const SELECTED_MICROPHONE = 'VideoconferenceApp-selectedMicrophone'
export const SELECTED_SPEAKERS = 'VideoconferenceApp-selectedSpeakers'
export const SELECTED_CAMERA = 'VideoconferenceApp-selectedCamera'

export const API_URL = new URL(import.meta.env.VITE_BACKEND_API_URL ?? 'http://localhost:8000')

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_API_URL?: string
  readonly VITE_FIREBASE_CONFIG?: string
  readonly VITE_FIREBASE_RECAPTCHA_SITE_KEY?: string
  readonly VITE_FIREBASE_FUNCTIONS_REGION?: string
  readonly VITE_FIREBASE_EMULATORS_AUTH_PORT?: string
  readonly VITE_FIREBASE_EMULATORS_FIRESTORE_PORT?: string
  readonly VITE_FIREBASE_EMULATORS_STORAGE_PORT?: string
  readonly VITE_FIREBASE_EMULATORS_FUNCTIONS_PORT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'swiper' // TODO FIXME remove after https://github.com/nolimits4web/swiper/issues/6508

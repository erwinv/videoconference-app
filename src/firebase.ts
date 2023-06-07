import { type FirebaseOptions } from 'firebase/app'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import {
  browserLocalPersistence,
  browserSessionPersistence,
  connectAuthEmulator,
  getAuth as getFirebaseAuth,
  type Auth,
} from 'firebase/auth'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { connectFirestoreEmulator, getFirestore, type Firestore } from 'firebase/firestore'
import { connectFunctionsEmulator, getFunctions, type Functions } from 'firebase/functions'
import { getMessaging, type Messaging } from 'firebase/messaging'
import { connectStorageEmulator, getStorage, type FirebaseStorage } from 'firebase/storage'

const config: FirebaseOptions = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG ?? '{}')
const isLocal = window.location.hostname === 'localhost'
const emulatorPorts = {
  auth: Number(import.meta.env.VITE_FIREBASE_EMULATORS_AUTH_PORT),
  firestore: Number(import.meta.env.VITE_FIREBASE_EMULATORS_FIRESTORE_PORT),
  storage: Number(import.meta.env.VITE_FIREBASE_EMULATORS_STORAGE_PORT),
  functions: Number(import.meta.env.VITE_FIREBASE_EMULATORS_FUNCTIONS_PORT),
}
const siteKey = import.meta.env.VITE_FIREBASE_RECAPTCHA_SITE_KEY ?? ''
const region = import.meta.env.VITE_FIREBASE_FUNCTIONS_REGION ?? ''

export function initializeCompatApp() {
  const app = firebase.initializeApp(config)
  if (!isLocal && siteKey) {
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(siteKey),
      isTokenAutoRefreshEnabled: true,
    })
  }
  return app
}

let auth: Auth
export function getAuth() {
  if (!auth) {
    auth = getFirebaseAuth(firebase.app())
    if (isLocal) {
      connectAuthEmulator(auth, `http://127.0.0.1:${emulatorPorts.auth}`)
    }
    auth.setPersistence(isLocal ? browserSessionPersistence : browserLocalPersistence)
  }
  return auth
}

let db: Firestore
export function getDb() {
  if (!db) {
    db = getFirestore(firebase.app())
    if (isLocal) {
      connectFirestoreEmulator(db, 'localhost', emulatorPorts.firestore)
    }
  }
  return db
}

let storage: FirebaseStorage
export function getObjectStorage() {
  if (!storage) {
    storage = getStorage(firebase.app())
    if (isLocal) {
      connectStorageEmulator(storage, 'localhost', emulatorPorts.storage)
    }
  }
  return storage
}

let functions: Functions
export function getFns() {
  if (!functions) {
    functions = getFunctions(firebase.app(), region)
    if (isLocal) {
      connectFunctionsEmulator(functions, 'localhost', emulatorPorts.functions)
    }
  }
  return functions
}

let messaging: Messaging
export function getMsg() {
  if (!messaging) {
    messaging = getMessaging(firebase.app())
  }
  return messaging
}

import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, enableIndexedDbPersistence, connectFirestoreEmulator } from 'firebase/firestore'
import { getAuth, signInAnonymously, onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth'

let _initialized = false
let _db: ReturnType<typeof getFirestore> | null = null
let _auth: ReturnType<typeof getAuth> | null = null

export function initFirebase() {
  if (_initialized) return { db: _db!, auth: _auth! }

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  }

  if (!getApps().length) {
    initializeApp(firebaseConfig)
  }

  const db = getFirestore()
  const auth = getAuth()

  // Optional emulator support for local development
  if (import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
    const host = import.meta.env.VITE_FIREBASE_EMULATOR_HOST || 'localhost'
    const port = Number(import.meta.env.VITE_FIRESTORE_EMULATOR_PORT || 8080)
    try { connectFirestoreEmulator(db, host, port) } catch (e) { /* ignore if already connected */ }
  }

  // enable persistence best-effort
  enableIndexedDbPersistence(db).catch((err) => {
    // can fail in some browsers or multi-tab
    // keep going without persistence
    // console.warn('IndexedDB persistence failed', err)
  })

  // set local persistence and sign in anonymously if needed
  setPersistence(auth, browserLocalPersistence).catch(()=>{})

  // sign in anonymously (no-op if already signed in)
  if (!auth.currentUser) {
    signInAnonymously(auth).catch(()=>{})
  }

  _initialized = true
  _db = db
  _auth = auth
  return { db, auth }
}

export function getDb(){
  if (!_db) return initFirebase().db
  return _db
}
export function getAuthClient(){
  if (!_auth) return initFirebase().auth
  return _auth
}

export function onAuthReady(cb: (uid: string|null)=>void){
  const { auth } = initFirebase()
  if (auth.currentUser) { cb(auth.currentUser.uid); return ()=>{} }
  const off = onAuthStateChanged(auth,(u)=>{
    cb(u ? u.uid : null)
  })
  return off
}

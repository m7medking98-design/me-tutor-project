/**
 * Firebase bootstrap.
 *
 * The platform runs in demo mode until real credentials are added to
 * `.env.local` (see `.env.local.example`). Once NEXT_PUBLIC_FIREBASE_API_KEY
 * exists, auth and Firestore activate automatically — no code changes.
 */
import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  type Firestore,
} from "firebase/firestore";

export const isFirebaseEnabled = Boolean(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY
);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

if (isFirebaseEnabled) {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
  app = getApps().length ? getApps()[0] : initializeApp(config);
  auth = getAuth(app);
  // Persistent cache: progress writes queued offline (or mid-refresh) survive
  // and sync when the connection returns.
  try {
    db = initializeFirestore(app, {
      localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager(),
      }),
    });
  } catch {
    // Already initialized (hot reload) — reuse the existing instance
    db = getFirestore(app);
  }
}

export { app, auth, db };

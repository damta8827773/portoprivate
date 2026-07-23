import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

/**
 * Firebase powers Google sign-in AND the chat-room comments (Firestore).
 *
 * The config now comes ONLY from VITE_FIREBASE_* env vars (see frontend/.env,
 * which is gitignored) so no key literal lives in the committed source. Note
 * that Firebase web API keys are public by design - real security is Firebase
 * Authorized Domains + Firestore rules, not key secrecy - so the key still
 * appears in the built bundle and the Google auth-popup URL; that is inherent
 * to Firebase Auth and cannot be hidden while using it.
 */
const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let firestore: Firestore | null = null;

export const isFirebaseConfigured = Boolean(config.apiKey && config.projectId);

if (isFirebaseConfigured) {
  app = initializeApp(config);
  auth = getAuth(app);
  firestore = getFirestore(app);
}

export const firebaseAuth = auth;
export const db = firestore;
export const googleProvider = new GoogleAuthProvider();

/** Current user's Firebase ID token, sent to the API to prove identity. */
export async function getIdToken(): Promise<string | null> {
  const user = auth?.currentUser;
  if (!user) return null;
  return user.getIdToken();
}

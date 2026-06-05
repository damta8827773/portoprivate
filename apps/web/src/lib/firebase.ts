import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth';

/**
 * Firebase is used ONLY for Google sign-in identity in the chat room.
 * Comment data itself lives in MySQL via the REST API (see useComments).
 * Returns null when env vars are not configured, so the app still runs.
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

export const isFirebaseConfigured = Boolean(config.apiKey && config.projectId);

if (isFirebaseConfigured) {
  app = initializeApp(config);
  auth = getAuth(app);
}

export const firebaseAuth = auth;
export const googleProvider = new GoogleAuthProvider();

/** Current user's Firebase ID token, sent to the API to prove identity. */
export async function getIdToken(): Promise<string | null> {
  const user = auth?.currentUser;
  if (!user) return null;
  return user.getIdToken();
}

import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth';

/**
 * Firebase is used ONLY for Google sign-in identity in the chat room.
 * Comment data itself lives in MySQL via the REST API (see useComments).
 *
 * Web Firebase config values are public by design (security comes from Firebase
 * Authorized Domains + rules, not key secrecy). These are the project's original
 * keys used as defaults so Google login works out of the box; override via the
 * VITE_FIREBASE_* env vars for a different Firebase project.
 */
const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyC80W6y97OPM8m6VeiKs_0vt7oCd5HsTi8',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'projectdamta.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'projectdamta',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'projectdamta.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '118530088464',
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID || '1:118530088464:web:f193173dcc75d7557b7495',
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

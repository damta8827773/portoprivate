import { useEffect, useRef, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, type User } from 'firebase/auth';
import { firebaseAuth, googleProvider, isFirebaseConfigured } from '../lib/firebase';

export interface AuthUser {
  name: string;
  email: string;
  photo: string;
}

/**
 * Benign popup-lifecycle errors: the user closed the Google window or clicked
 * sign-in again before the first popup resolved. These are NOT failures, so we
 * never surface them - showing an alert for them was confusing.
 */
const IGNORED_AUTH_ERRORS = new Set([
  'auth/cancelled-popup-request',
  'auth/popup-closed-by-user',
  'auth/user-cancelled',
]);

/** Google sign-in identity for the chat room (Firebase Auth only - no Firestore). */
export function useFirebaseAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(!isFirebaseConfigured);
  // Guards against a second popup opening while one is already pending, which
  // is what triggers auth/cancelled-popup-request.
  const signingIn = useRef(false);

  useEffect(() => {
    if (!firebaseAuth) return;
    const unsub = onAuthStateChanged(firebaseAuth, (u: User | null) => {
      setUser(
        u
          ? { name: u.displayName ?? 'Anonim', email: u.email ?? '', photo: u.photoURL ?? '' }
          : null,
      );
      setReady(true);
    });
    return unsub;
  }, []);

  const login = async () => {
    if (!firebaseAuth) {
      alert('Firebase belum dikonfigurasi. Isi VITE_FIREBASE_* di .env untuk login.');
      return;
    }
    if (signingIn.current) return; // ignore rapid double-clicks
    signingIn.current = true;
    try {
      await signInWithPopup(firebaseAuth, googleProvider);
    } catch (e) {
      const code = (e as { code?: string }).code ?? '';
      if (!IGNORED_AUTH_ERRORS.has(code)) {
        alert(`Gagal login: ${(e as Error).message}`);
      }
    } finally {
      signingIn.current = false;
    }
  };

  const logout = () => firebaseAuth && signOut(firebaseAuth);

  return { user, ready, login, logout, isFirebaseConfigured };
}

import { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, type User } from 'firebase/auth';
import { firebaseAuth, googleProvider, isFirebaseConfigured } from '../lib/firebase';

export interface AuthUser {
  name: string;
  email: string;
  photo: string;
}

/** Google sign-in identity for the chat room (Firebase Auth only — no Firestore). */
export function useFirebaseAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(!isFirebaseConfigured);

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
    try {
      await signInWithPopup(firebaseAuth, googleProvider);
    } catch (e) {
      alert(`Gagal login: ${(e as Error).message}`);
    }
  };

  const logout = () => firebaseAuth && signOut(firebaseAuth);

  return { user, ready, login, logout, isFirebaseConfigured };
}

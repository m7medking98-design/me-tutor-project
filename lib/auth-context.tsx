"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as fbSignOut,
  updateProfile,
} from "firebase/auth";
import { auth, isFirebaseEnabled } from "@/lib/firebase";
import { getDemoUser } from "@/lib/data";
import type { UserProfile } from "@/lib/types";

const DEMO_SESSION_KEY = "miyar-demo-session";

interface AuthContextValue {
  user: UserProfile | null;
  /** true until the initial auth state is known (prevents redirect flicker) */
  loading: boolean;
  isDemo: boolean;
  signInDemo: () => void;
  signInEmail: (email: string, password: string) => Promise<void>;
  signUpEmail: (name: string, email: string, password: string) => Promise<void>;
  signInGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isFirebaseEnabled && auth) {
      return onAuthStateChanged(auth, (fbUser) => {
        if (fbUser) {
          // Real profile data (xp, streak…) will come from Firestore later;
          // until then the seeded stats keep the UI complete.
          const seed = getDemoUser();
          setUser({
            ...seed,
            uid: fbUser.uid,
            displayName: fbUser.displayName ?? seed.displayName,
            email: fbUser.email ?? seed.email,
            photoURL: fbUser.photoURL,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });
    }
    // Demo mode: restore session from localStorage
    const hasSession = localStorage.getItem(DEMO_SESSION_KEY) === "1";
    setUser(hasSession ? getDemoUser() : null);
    setLoading(false);
  }, []);

  const signInDemo = useCallback(() => {
    localStorage.setItem(DEMO_SESSION_KEY, "1");
    setUser(getDemoUser());
  }, []);

  const signInEmail = useCallback(async (email: string, password: string) => {
    if (!isFirebaseEnabled || !auth) throw new Error("demo-mode");
    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  const signUpEmail = useCallback(
    async (name: string, email: string, password: string) => {
      if (!isFirebaseEnabled || !auth) throw new Error("demo-mode");
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });
    },
    []
  );

  const signInGoogle = useCallback(async () => {
    if (!isFirebaseEnabled || !auth) throw new Error("demo-mode");
    await signInWithPopup(auth, new GoogleAuthProvider());
  }, []);

  const signOut = useCallback(async () => {
    if (isFirebaseEnabled && auth) {
      await fbSignOut(auth);
    } else {
      localStorage.removeItem(DEMO_SESSION_KEY);
    }
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isDemo: !isFirebaseEnabled,
        signInDemo,
        signInEmail,
        signUpEmail,
        signInGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

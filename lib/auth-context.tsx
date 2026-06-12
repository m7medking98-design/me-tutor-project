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
import { ensureUserProfile, subscribeProfile } from "@/lib/data/student-store";
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
      // Real mode: the profile doc in Firestore is the source of truth.
      // `loading` stays true until that doc resolves so guarded pages never
      // flash with missing stats.
      let unsubProfile: (() => void) | null = null;
      const unsubAuth = onAuthStateChanged(auth, (fbUser) => {
        unsubProfile?.();
        unsubProfile = null;
        if (!fbUser) {
          setUser(null);
          setLoading(false);
          return;
        }
        // Idempotent: creates the doc on first Google sign-in; signUpEmail
        // already wrote it (with the typed name) for email signups.
        void ensureUserProfile(fbUser);
        unsubProfile = subscribeProfile(fbUser.uid, (profile) => {
          if (profile) {
            setUser(profile);
            setLoading(false);
          }
          // profile === null → doc not created yet; keep loading until it is
        });
      });
      return () => {
        unsubAuth();
        unsubProfile?.();
      };
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
      // Write the profile doc with the typed name BEFORE updateProfile —
      // onAuthStateChanged fires immediately and must find the right name.
      await ensureUserProfile(cred.user, name);
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

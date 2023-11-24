/*

This source file is part of the Stanford Spezi Template Web Dashboard open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
   
*/
'use client';

import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  User,
  updateEmail,
  updatePassword,
} from 'firebase/auth';

import { auth } from '../app/components/CloudStorageConnector/firebase';
import { useRouter } from 'next/navigation';

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = React.createContext<any>(undefined);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const handleSignUp = async (
    email: string,
    password: string,
    setMessage: Function,
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      console.log('User signed up:', user);
      setMessage('Account created successfully. Click Sign In.');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Sign-up failed:', error.message);
      }
      setMessage('Sign-up failed. Please try again.');
    }
  };

  const handleSignIn = async (
    email: string,
    password: string,
    setLoggedInUser: Function,
    setMessage: Function,
  ) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      console.log('User signed in:', user);
      setLoggedInUser(user);
      router.push('/patients');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Sign-in failed:', error.message);
      }
      setMessage('Login failed. Please check your email and password.');
    }
  };

  const handleSignOut = async (setMessage: Function) => {
    try {
      console.log('User to sign out:', auth.currentUser);
      const userCredential = await signOut(auth);
      router.push('/');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Sign-out failed:', error.message);
      }
      setMessage('Sign-out failed.');
    }
  };

  const resetPassword = (email: string) => sendPasswordResetEmail(auth, email);

  const updateUserEmail = useCallback(
    async (email: string) => {
      if (currentUser) {
        try {
          await updateEmail(currentUser, email);
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error('Error updating email:', error.message);
          }
        }
      } else {
        console.error('No user is currently signed in.');
      }
    },
    [currentUser],
  );

  const updateUserPassword = useCallback(
    async (password: string) => {
      if (currentUser) {
        try {
          await updatePassword(currentUser, password);
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error('Error updating password:', error.message);
          }
        }
      }
    },
    [currentUser],
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);

      if (auth.currentUser) {
        auth.currentUser.getIdTokenResult().then((result) => {
          if (result.claims.role === 'admin') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        });
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      isAdmin,
      handleSignIn,
      handleSignUp,
      handleSignOut,
      resetPassword,
      updateUserEmail,
      updateUserPassword,
    }),
    [currentUser, isAdmin, updateUserEmail, updateUserPassword],
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

import React, { useContext, useState, useEffect, useMemo } from 'react';
import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signOut,
   sendPasswordResetEmail,
} from 'firebase/auth';

import { auth } from '@stanfordspezi/cloud-storage-connector';

const AuthContext = React.createContext<any>(undefined);

export function useAuth() {
   return useContext(AuthContext);
}

export function AuthProvider({ children }) {
   const [currentUser, setCurrentUser] = useState();
   const [isAdmin, setIsAdmin] = useState(false);
   const [loading, setLoading] = useState(true);


   const handleSignUp = async (email: string, password: string, setMessage: Function) => {
      try {
         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
         const user = userCredential.user;
         console.log('User signed up:', user);
         setMessage('Account created successfully. Click Sign In.');
      } catch (error) {
         console.error('Sign-up failed:', error.message);
         setMessage('Sign-up failed. Please try again.');
      }
   };

   const handleSignIn = async (email: string, password: string, router, setLoggedInUser: Function, setMessage: Function) => {
      try {
         const userCredential = await signInWithEmailAndPassword(auth, email, password);
         const user = userCredential.user;
         console.log('User signed in:', user);
         setLoggedInUser(user);
         router.push('/patients');
      } catch (error) {
         console.error('Sign-in failed:', error.message);
         setMessage('Login failed. Please check your email and password.');
      }
   };

   const handleSignOut = async (router) => {
      try {
         console.log('User to sign out:', auth.currentUser);
         const userCredential = await signOut(auth);
         router.push('/');
      } catch (error) {
         console.error('Sign-out failed:', error.message);
      }
   };


   const resetPassword = (email: string) => sendPasswordResetEmail(auth, email);

   const updateEmail = (email: string) => currentUser.updateEmail(email);

   const updatePassword = (password: string) => currentUser.updatePassword(password);

   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
         setCurrentUser(user);

         if (auth.currentUser) {
            auth.currentUser.getIdTokenResult()
               .then((result) => {
                  if (result.claims.role === "admin") {
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

   const value = useMemo(() => ({
      currentUser,
      isAdmin,
      handleSignIn,
      handleSignUp,
      handleSignOut,
      resetPassword,
      updateEmail,
      updatePassword,
   }), [currentUser]);

   return (
      <AuthContext.Provider value={value}>
         {!loading && children}
      </AuthContext.Provider>
   );
}

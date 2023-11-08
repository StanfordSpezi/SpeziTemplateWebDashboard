import React, { useContext, useState, useEffect, useMemo } from 'react';
import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signOut,
   sendPasswordResetEmail,
} from 'firebase/auth';

import { auth } from 'cloud-storage-connector';

const AuthContext = React.createContext();

export function useAuth() {
   return useContext(AuthContext);
}

export function AuthProvider({ children }) {
   const [currentUser, setCurrentUser] = useState();
   const [isAdmin, setIsAdmin] = useState(false);
   const [loading, setLoading] = useState(true);


   const handleSignUp = async (email, password, setMessage) => {
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

   const handleSignIn = async (email, password, router, setLoggedInUser, setMessage) => {
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


   const resetPassword = (email) => sendPasswordResetEmail(auth, email);

   const updateEmail = (email) => currentUser.updateEmail(email);

   const updatePassword = (password) => currentUser.updatePassword(password);

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

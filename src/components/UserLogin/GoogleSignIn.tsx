/*

This source file is part of the Stanford Spezi Template Web Dashboard open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
   
*/

import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import GoogleButton from 'react-google-button';

export default function GoogleSignIn(){
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const router = useRouter();


  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push('/patients'); // redirect to patients list
    } catch (error) {
      console.error('Google Sign-In Error:', error.message);
    }
  };

  return (
    <GoogleButton onClick={handleSignIn}>Sign in with Google</GoogleButton>
  );
}


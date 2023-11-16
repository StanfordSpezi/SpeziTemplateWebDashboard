import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/router';

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
    <GoogleButton  onClick={handleSignIn}>Sign in with Google</GoogleButton>
  );
}



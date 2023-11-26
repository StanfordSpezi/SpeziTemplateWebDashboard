
/*

This source file is part of the Stanford Spezi Template Web Dashboard open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
   
*/

import React, { useState, useEffect } from 'react';
import { getAuth, signInWithPopup, OAuthProvider } from "firebase/auth";
import { Button } from '@mui/material';

export default function StanfordSSO() {
  const [error, setError] = useState('');
  const auth = getAuth();
  const handleSignIn = () => {
    const provider = new OAuthProvider('oidc.stanford-sso');
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = OAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        const idToken = credential.idToken;
        console.log("credential", credential);
        // Process your OAuth access token and ID Token
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  if (error) {
    console.log(error);
  }  
  return <Button sx={{ margin: 2, backgroundColor: '#8C1515'}} variant="contained" onClick={handleSignIn}>Sign in with Stanford SSO</Button>;


}

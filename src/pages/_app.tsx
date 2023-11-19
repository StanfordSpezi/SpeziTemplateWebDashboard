/*

This source file is part of the Stanford Spezi Template Web Dashboard open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
   
*/

import { AuthProvider } from '../contexts/AuthContext';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

/*

This source file is part of the Stanford Spezi Template Web Dashboard open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
   
*/

import { AuthProvider } from '../contexts/AuthContext';
import { NextPage } from 'next';
import { AppProps } from 'next/app';

interface AppPropsWithLayout extends AppProps {
  Component: NextPage & {
    Layout?: React.ComponentType;
  };
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

//
// This source file is part of the Stanford Spezi Template Web Dashboard open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import Head from 'next/head';
import {UserLoginRegister, AuthProvider} from '@stanfordspezi/user-login-register'
// import styles from '../styles/Home.module.css';
import { Typography, Stack } from '@mui/material';

export default function Home() {
  return (
    <div>
      <AuthProvider>
        <Head>
          <title>Spezi Dashboard Template</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <Stack spacing={3}>
            <Typography variant="h4" sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }} >
              Welcome to your Dashboard!
            </Typography>
            <UserLoginRegister includeGoogle="true"></UserLoginRegister>
          </Stack>
        </main>
      </AuthProvider>

    </div>
  );
}

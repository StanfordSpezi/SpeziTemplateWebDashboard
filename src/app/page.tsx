/*

This source file is part of the Stanford Spezi Template Web Dashboard open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
   
*/

'use client';

import Head from 'next/head';
import EmailPasswordLogin from './components/Auth';
import styles from '../styles/Home.module.css';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';

import { Typography, Stack } from '@mui/material';

export default function Home() {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push('/patients');
    }
  }, [currentUser, router]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Spezi Template Web Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Stack spacing={3}>
          <Typography
            variant="h4"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            Welcome to your Dashboard!
          </Typography>
          <EmailPasswordLogin />
        </Stack>
      </main>
    </div>
  );
}

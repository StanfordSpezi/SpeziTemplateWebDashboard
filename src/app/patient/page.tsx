/*

This source file is part of the Stanford Spezi Template Web Dashboard open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
   
*/

'use client';

import { Typography, Paper } from '@mui/material';
import Header from '../components/Header';
import { useRouter, useSearchParams } from 'next/navigation';
import withAuth from '../components/Auth/withAuth';

// placeholder page to store data modules for selected patient
const PatientsPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get('id');

  return (
    <div>
      <Header></Header>
      <div
        style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        <Typography sx={{ display: 'flex', justifyContent: 'center' }}>
          Viewing data for patient {id}
        </Typography>
        <Paper elevation={6} sx={{ flex: 1, margin: 4 }}></Paper>
      </div>
    </div>
  );
};

export default withAuth(PatientsPage, '/');

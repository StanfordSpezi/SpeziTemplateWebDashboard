/*

This source file is part of the Stanford Spezi Template Web Dashboard open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
   
*/

'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';

// TO DO: include currentUser's name next to log out button
export default function Header() {
  const router = useRouter();
  const { handleSignOut, currentUser } = useAuth();
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">MyDashboard</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSignOut(router)}
        >
          Log Out
        </Button>
      </Toolbar>
    </AppBar>
  );
}

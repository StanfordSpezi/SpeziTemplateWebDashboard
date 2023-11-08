import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '@stanfordspezi/user-login-register';
import { useRouter } from 'next/router'
import { useNavigation } from 'next/navigation';

// TO DO: include currentUser's name next to log out button 
export default function Header() {
  const router = useRouter();
  const { handleSignOut, currentUser } = useAuth();
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">
          MyDashboard
        </Typography>
        <Button variant="contained" color="primary" onClick={() => handleSignOut(router)}>
          Log Out
        </Button>
       
      </Toolbar> 
    </AppBar>
  );
}


//
// This source file is part of the Stanford Spezi Template Web Dashboard open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//


/**
 * Docs for `UserLoginRegister` function.
 */


'use client'

import React from 'react';
import { useRef, useState } from 'react';
import GoogleSignIn from './GoogleSignIn';
import { useRouter } from 'next/navigation'

import {
  Avatar,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  Button
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../../contexts/AuthContext';


// Combined login-register component 
export function UserLoginRegister() {
  const [message, setMessage] = useState(null);
  const [logInScreen, changeToLogInScreen] = useState(true);
  const [firstName, changeFirstName] = useState("");
  const [lastName, changeLastName] = useState("");
  const [password1, changePassword1] = useState("");
  const [password2, changePassword2] = useState("");
  const [email, changeEmail] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);


  const defaultTheme = createTheme();
  const router = useRouter();

  const { handleSignIn, handleSignUp } = useAuth();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '60vh', width: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            overflowY: 'auto',
            display: "flex",
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => {
              return t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900];
            },
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 'auto',
              mx: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1 }}>
            </Avatar>
            <Typography component="h1" variant="h5">
              {logInScreen === true ? "Sign In" : "Sign Up"}
            </Typography>
            <Box component="form" noValidate sx={{
              mt: 1, display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              {logInScreen === false ?
                (
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="first_name"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        onChange={(event) => changeFirstName(event.target.value)}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="last_name"
                        onChange={(event) => changeLastName(event.target.value)}
                      />
                    </Grid>
                  </Grid>
                )
                : null}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={logInScreen ? "Email" : "Enter email"}
                name="email"
                onChange={(event) => changeEmail(event.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Choose a password"
                type="password"
                id="password1"
                onChange={(event) => changePassword1(event.target.value)}
              />
              {logInScreen ? null :
                (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="repeat_password"
                    label="Confirm Password"
                    type="password"
                    id="password2"
                    onChange={(event) => changePassword2(event.target.value)}
                    helperText={password1 !== password2 && 'Passwords do not match'}
                  />
                )}
              <Button
                disabled={
                  logInScreen
                    ? !email || !password1
                    : !firstName || !lastName || !email || !password1 || !password2
                }
                onClick={() => (logInScreen ? handleSignIn(email, password1, router, setLoggedInUser, setMessage)
                  : handleSignUp(email, password2, setMessage))}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {logInScreen === true ? "Sign In" : "Sign Up"}
              </Button>
             <GoogleSignIn></GoogleSignIn> 
              <Typography variant="caption" color="success">{message}</Typography>
              <Grid container>
                <Grid item>
                  <Button variant="text"
                    onClick={() => {
                      changeToLogInScreen(!logInScreen);
                      setMessage(null);
                    }}
                  >
                    {logInScreen === true ? "Sign Up" : "Sign In"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

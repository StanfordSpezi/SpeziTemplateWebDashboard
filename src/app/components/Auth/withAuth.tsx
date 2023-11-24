/*

This source file is part of the Stanford Spezi Template Web Dashboard open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
   
*/

import React, { ComponentType, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>,
  redirectTo: string = '/',
) => {
  return function WithAuthComponent(props: P) {
    const { currentUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!currentUser) {
        router.push(redirectTo);
      }
    }, [currentUser, router]);

    return currentUser ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;

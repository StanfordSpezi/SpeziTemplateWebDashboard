//
// This source file is part of the Stanford Spezi Template Web Dashboard open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Stanford Spezi Template Web Dashboard',
  description: 'Stanford Spezi Template Web Dashboard',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

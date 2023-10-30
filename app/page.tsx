//
// This source file is part of the Stanford Spezi Template Web Dashboard open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import Image from 'next/image'
import { generateGreeting } from '@stanfordspezi/example-package'

export default function Home() {
  const greeting = generateGreeting()

  return (
    <div className="container">
      <Image
        src={`${process.env.basePath || ''}/stanfordspezi.png`}
        alt="Stanford Spezi Logo"
        width={200}
        height={200}
      />
      <h1>{`${greeting.message} to the ${greeting.project}`}</h1>
    </div>
  )
}

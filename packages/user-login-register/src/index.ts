//
// This source file is part of the Stanford Spezi Template Web Dashboard open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

/**
 * Docs for Example module
 * @packageDocumentation
 */

/**
 * Docs for `createLoginRegister` function.
 */
export function createLoginRegister(): Greeting {
  return {
    message: 'Welcome',
    project: 'Stanford Spezi Template Web Dashboard',
  }
}

/**
 * A greeting with a message and a proejct name.
 */
export interface Greeting {
  message: String
  project: String
}

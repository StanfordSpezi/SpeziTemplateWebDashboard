//
// This source file is part of the Stanford Spezi Template Web Dashboard open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  collectCoverage: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.jest.json',
      },
    ],
  },
  moduleNameMapper: {
    '^@stanfordspezi/example-package$':
      '<rootDir>/packages/example-package/dist',
  },
}

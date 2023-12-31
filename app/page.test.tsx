//
// This source file is part of the Stanford Spezi Template Web Dashboard open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from './page'

describe('Home Component', () => {
  it('renders the Stanford Spezi Template Web Dashboard heading', () => {
    const { getByText } = render(<Home />)

    const headingElement = getByText(
      /Welcome to the Stanford Spezi Template Web Dashboard/i,
    )

    expect(headingElement).toBeInTheDocument()
  })

  it('renders the Stanford Spezi Logo', () => {
    const { getByAltText } = render(<Home />)

    const imageElement = getByAltText('Stanford Spezi Logo') as HTMLImageElement

    expect(imageElement).toBeInTheDocument()
    expect(imageElement.src).toContain('stanfordspezi.png')
  })
})

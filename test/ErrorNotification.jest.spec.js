import React from 'react'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import '@testing-library/jest-dom'
import ErrorNotification from '../src/components/ErrorNotification'

describe('<ErrorNotification />', () => {

  it('renders message', async () => {
    await act(async () => {
      render(<ErrorNotification message={'test error notification'}/>)
    })
    const element = screen.getByText('test error notification')
    expect(element).toBeDefined()
  })
})

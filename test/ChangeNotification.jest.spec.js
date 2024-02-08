import React from 'react'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import '@testing-library/jest-dom'
import ChangeNotification from '../src/components/ChangeNotification'

describe('<ChangeNotification />', () => {

  it('renders message', async () => {
    await act(async () => {
      render(<ChangeNotification message={'test notification'}/>)
    })
    const element = screen.getByText('test notification')
    expect(element).toBeDefined()
  })
})

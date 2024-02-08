import React from 'react'
import { render, screen } from '@testing-library/react'
import axiosMock from 'axios'
import { act } from 'react-dom/test-utils'
import '@testing-library/jest-dom'
import App from '../src/components/App'

jest.mock('axios')

describe('<App />', () => {
  beforeEach(function() {
    axiosMock.get.mockResolvedValueOnce(
      {
        data: [
          {
            'name': 'Arto Hellas',
            'number': '040-0400400',
            'id': 1
          },
          {
            'name': 'Ada Lovelace',
            'number': '39-44-5323523',
            'id': 2
          }
        ]
      }
    )
  })

  it('fetches data', async () => {
    await act(async () => {
      render(<App/>)
    })
    expect(axiosMock.get).toHaveBeenCalledTimes(1)
    expect(axiosMock.get).toHaveBeenCalledWith('api/persons')
  })

  it('renders data', async () => {
    await act(async () => {
      render(<App/>)
    })
    const artoPerson = screen.getByText('Arto Hellas', { exact: false })
    const artoNumber = screen.getAllByText('040-0400400', { exact: false })
    const adaPerson = screen.getByText('Ada Lovelace', { exact: false })
    const adaNumber = screen.getAllByText('39-44-5323523', { exact: false })
    expect(artoPerson).toBeDefined()
    expect(artoNumber).toBeDefined()
    expect(adaPerson).toBeDefined()
    expect(adaNumber).toBeDefined()
  })
})

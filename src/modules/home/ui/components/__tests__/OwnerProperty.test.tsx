import React from 'react'
import { render } from '@testing-library/react'
import { OwnerProperty } from '../OwnerProperty'

const mockOwner = {
  idOwner: '1',
  name: 'Juan Pérez',
  address: 'Calle Falsa 123',
  photo: 'https://example.com/photo.jpg',
  birthday: '1980-05-15'
}

describe('OwnerProperty', () => {
  test('renders without crashing', () => {
    const { container } = render(<OwnerProperty owner={mockOwner} />)
    expect(container).toBeDefined()
  })

  test('renders with minimal owner data', () => {
    const minimalOwner = {
      idOwner: '2',
      name: 'Ana García',
      address: '',
      photo: '',
      birthday: ''
    }
    const { container } = render(<OwnerProperty owner={minimalOwner} />)
    expect(container).toBeDefined()
  })
})
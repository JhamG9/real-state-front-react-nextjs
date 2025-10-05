import React from 'react'
import { render } from '@testing-library/react'
import { Card } from '../Card'

const mockProperty = {
  idProperty: '1',
  name: 'Casa Test',
  address: 'Dirección Test',
  price: 100000,
  year: 2020,
  codeInternal: 'TEST001',
  idOwner: 'owner1',
  images: ['test-image.jpg']
}

describe('Card', () => {
  test('renders without crashing', () => {
    const { container } = render(<Card property={mockProperty} />)
    expect(container).toBeDefined()
  })
})

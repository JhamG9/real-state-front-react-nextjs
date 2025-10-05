import React from 'react'
import { render } from '@testing-library/react'
import { PropertyInformation } from '../PropertyInformation'

const mockProperty = {
  idProperty: '1',
  name: 'Casa Test',
  address: 'Av. Principal 123',
  price: 350000,
  year: 2018,
  codeInternal: 'PROP123',
  idOwner: 'owner1',
  images: ['test-image.jpg']
}

describe('PropertyInformation', () => {
  test('renders without crashing', () => {
    const { container } = render(<PropertyInformation property={mockProperty} />)
    expect(container).toBeDefined()
  })

  test('renders with property without year', () => {
    const propertyWithoutYear = {
      ...mockProperty,
      year: 0
    }
    const { container } = render(<PropertyInformation property={propertyWithoutYear} />)
    expect(container).toBeDefined()
  })
})
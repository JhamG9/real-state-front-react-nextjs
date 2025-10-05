import React from 'react'
import { render } from '@testing-library/react'
import { PropertyFilters } from '../PropertyFilters'

// Mock react-hook-form Controller
jest.mock('react-hook-form', () => ({
  Controller: ({ render: renderField }: { render: (props: { field: { value: string; onChange: () => void } }) => React.ReactNode }) => 
    renderField({ field: { value: '', onChange: jest.fn() } })
}))

describe('PropertyFilters', () => {
  const mockControl = {} as never
  const mockWatchedValues = {
    name: 'Casa test',
    address: 'Dirección test',
    minPrice: 100000,
    maxPrice: 500000
  }

  test('renders without crashing', () => {
    const { container } = render(
      <PropertyFilters
        control={mockControl}
        watchedValues={mockWatchedValues}
        maxPrice={1000000}
        loading={false}
        propertiesCount={5}
      />
    )
    expect(container).toBeDefined()
  })

  test('renders with loading state', () => {
    const { container } = render(
      <PropertyFilters
        control={mockControl}
        watchedValues={mockWatchedValues}
        maxPrice={1000000}
        loading={true}
        propertiesCount={0}
      />
    )
    expect(container).toBeDefined()
  })
})
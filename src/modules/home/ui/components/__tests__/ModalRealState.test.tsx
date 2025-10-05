import React from 'react'
import { render } from '@testing-library/react'
import { ModalRealState } from '../ModalRealState'

// Mock the API repository to resolve immediately
const mockGetPropertyById = jest.fn().mockResolvedValue({
    idProperty: '1',
    name: 'Casa Test',
    address: 'Test Address',
    price: 100000,
    year: 2020,
    codeInternal: 'TEST001',
    idOwner: 'owner1',
    images: ['test.jpg'],
    owner: { name: 'Test Owner' },
    propertyTraces: []
})

jest.mock('../../../infrastructure/repositories/apiPropertyRepository', () => ({
    ApiPropertyRepository: jest.fn().mockImplementation(() => ({
        getPropertyById: mockGetPropertyById
    }))
}))

// Mock child components to avoid their complexity
jest.mock('../SliderRealState', () => ({
    SliderRealState: ({ propertyImages }: { propertyImages: string[] }) =>
        <div data-testid="slider">Images: {propertyImages.length}</div>
}))

jest.mock('../PropertyInformation', () => ({
    PropertyInformation: ({ property }: { property: { name: string } }) =>
        <div data-testid="property-info">{property.name}</div>
}))

jest.mock('../OwnerProperty', () => ({
    OwnerProperty: ({ owner }: { owner: { name: string } }) =>
        <div data-testid="owner">{owner.name}</div>
}))

jest.mock('../HistoryTransactionsRealState', () => ({
    HistoryTransactionsRealState: ({ transactions }: { transactions: unknown[] }) =>
        <div data-testid="transactions">Transactions: {transactions.length}</div>
}))

describe('ModalRealState', () => {
    beforeEach(() => {
        mockGetPropertyById.mockClear()
    })

    test('renders without crashing when closed', () => {
        const { container } = render(
            <ModalRealState
                open={false}
                onClose={() => { }}
                propertyId={null}
            />
        )
        expect(container).toBeDefined()
    })

    test('renders without crashing with null propertyId', () => {
        const { container } = render(
            <ModalRealState
                open={true}
                onClose={() => { }}
                propertyId={null}
            />
        )
        expect(container).toBeDefined()
    })
})
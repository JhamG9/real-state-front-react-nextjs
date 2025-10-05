import React from 'react'
import { render, screen } from '@testing-library/react'
import { SliderRealState } from '../SliderRealState'

// Mock Material-UI components
jest.mock('@mui/material/Box', () => {
    return function MockBox({ children, ...props }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
        return <div {...props}>{children}</div>
    }
})

jest.mock('@mui/material/IconButton', () => {
    return function MockIconButton({ children, onClick, ...props }: React.PropsWithChildren<{ onClick?: () => void } & React.HTMLAttributes<HTMLButtonElement>>) {
        return <button onClick={onClick} {...props}>{children}</button>
    }
})

const mockImages = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg'
]

describe('SliderRealState', () => {
    test('renders without crashing', () => {
        const container = render(<SliderRealState propertyImages={mockImages} />)
        expect(container).toBeDefined()
    })

    test('has navigation buttons', () => {
        render(<SliderRealState propertyImages={mockImages} />)

        const buttons = screen.getAllByRole('button')
        expect(buttons.length).toBeGreaterThan(0)
    })

    test('shows counter', () => {
        render(<SliderRealState propertyImages={mockImages} />)

        // Buscar por texto parcial
        expect(screen.getByText('/', { exact: false })).toBeTruthy()
    })
})

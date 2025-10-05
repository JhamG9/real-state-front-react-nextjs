import React from 'react'
import { render } from '@testing-library/react'
import { HistoryTransactionsRealState } from '../HistoryTransactionsRealState'

const mockTransactions = [
  {
    dateSale: new Date('2023-01-15'),
    name: 'Venta Inicial',
    value: 200000,
    tax: 10000,
    idProperty: 'prop1'
  }
]

describe('HistoryTransactionsRealState', () => {
  test('renders without crashing', () => {
    const { container } = render(<HistoryTransactionsRealState transactions={mockTransactions} />)
    expect(container).toBeDefined()
  })

  test('renders with empty transactions', () => {
    const { container } = render(<HistoryTransactionsRealState transactions={[]} />)
    expect(container).toBeDefined()
  })
})
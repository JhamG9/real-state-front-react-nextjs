import { formatPrice, formatDate } from '../formatters'

describe('formatters', () => {
    describe('formatPrice', () => {
        test('formats prices correctly', () => {
            expect(formatPrice(1000000)).toContain('1.000.000')
            expect(formatPrice(500000)).toContain('500.000')
            expect(formatPrice(0)).toContain('0')
        })

        test('handles undefined values', () => {
            expect(formatPrice(undefined)).toBe('No disponible')
        })

        test('handles large numbers', () => {
            const result = formatPrice(1000000000)
            expect(result).toContain('1.000.000.000')
        })
    })

    describe('formatDate', () => {
        test('formats valid dates', () => {
            // Use a specific date that works consistently
            const date = new Date(2023, 11, 25) // December 25, 2023
            const result = formatDate(date)

            expect(result).toContain('2023')
            expect(result).toContain('diciembre')
        })

        test('handles date strings', () => {
            // Use ISO format with explicit time
            const result = formatDate('2023-12-25T12:00:00.000Z')
            expect(result).toContain('2023')
        })
    })
})
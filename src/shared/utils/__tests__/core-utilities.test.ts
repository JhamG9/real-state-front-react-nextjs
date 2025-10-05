import { formatPrice, formatDate } from '../formatters'

describe('Real Estate App - Core Utilities', () => {
    describe('Price Formatting', () => {
        test('formats Colombian pesos with correct currency symbol', () => {
            const price = formatPrice(350000000)
            expect(price).toContain('$')
            expect(price).toContain('350.000.000')
        })

        test('handles different price ranges', () => {
            expect(formatPrice(100000)).toContain('100.000')
            expect(formatPrice(1000000000)).toContain('1.000.000.000')
        })

        test('shows "No disponible" for invalid prices', () => {
            expect(formatPrice(undefined)).toBe('No disponible')
            // @ts-expect-error Testing null input
            expect(formatPrice(null)).toBe('No disponible')
        })

        test('handles zero price correctly', () => {
            const result = formatPrice(0)
            expect(result).toContain('0')
        })
    })

    describe('Date Formatting', () => {
        test('formats dates in Spanish locale', () => {
            const testDate = new Date(2023, 0, 15) // January 15, 2023
            const result = formatDate(testDate)

            expect(result).toContain('2023')
            expect(result).toContain('enero')
        })

        test('handles different months correctly', () => {
            const months = [
                { date: new Date(2023, 5, 15), expected: 'junio' },
                { date: new Date(2023, 11, 25), expected: 'diciembre' }
            ]

            months.forEach(({ date, expected }) => {
                const result = formatDate(date)
                expect(result).toContain(expected)
                expect(result).toContain('2023')
            })
        })

        test('formats string dates correctly', () => {
            const result = formatDate('2023-06-15T12:00:00Z')
            expect(result).toContain('2023')
            expect(result).toContain('junio')
        })
    })

    describe('Edge Cases', () => {
        test('handles very large numbers', () => {
            const largePrice = 999999999999
            const result = formatPrice(largePrice)
            expect(result).toContain('$')
            expect(typeof result).toBe('string')
        })

        test('handles decimal prices correctly', () => {
            const decimalPrice = 150000.75
            const result = formatPrice(decimalPrice)
            expect(result).toContain('150.000')
        })
    })
})
describe('Basic test setup', () => {
  test('should work correctly', () => {
    expect(1 + 1).toBe(2)
  })

  test('should handle strings', () => {
    expect('hello world').toContain('world')
  })

  test('should handle arrays', () => {
    const arr = [1, 2, 3]
    expect(arr).toHaveLength(3)
    expect(arr).toContain(2)
  })
})
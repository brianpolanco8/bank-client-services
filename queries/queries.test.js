const { getCountOfTable } = require('./queries')

test('should work fine', async () => {
    const query = await getCountOfTable('users', 'firstname')
    expect(query).toBe(17)
});
const userQuery = require('./userQuery')

test('should get count of users table', async () => {
    const query = await userQuery.getCountOfTable()
    expect(query).toBeGreaterThan(0)
});

test('should get all users', async () => {
    const query = await userQuery.getAllUsers()
    expect(query).toBeDefined()
})

// test('should delete users', async () => {
//     const query = await 
// })




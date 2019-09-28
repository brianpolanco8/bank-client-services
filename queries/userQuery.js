const sequelize = require('../data')

exports.getAllUsers = async () => {
    const results = await sequelize.query(`SELECT * FROM users`, { type: sequelize.QueryTypes.SELECT })
    return results
}

exports.getCountOfTable = async () => {
    const results = await sequelize.query(`SELECT COUNT(id) AS usersCount FROM users`, { type: sequelize.QueryTypes.SELECT })
    return results[0].usersCount
}

exports.deleteUser = async (id) => {
    const results = await sequelize.query(`DELETE FROM users WHERE id = ${id}`)
    console.log(results)
    return;
}
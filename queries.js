const sequelize = require('./data')

exports.getCountOfTable = async (tblName, column) => {
    const results = await sequelize.query(`SELECT COUNT(${column}) AS usersCount FROM ${tblName}`, { type: sequelize.QueryTypes.SELECT })
    return results[0]
}
const sequelize = require('../data')

exports.getAllUsers = async () => {
    const results = await sequelize.query(`SELECT * FROM tblEntidad INNER JOIN tblCliente on tblCliente.idEntidad = tblEntidad.idEntidad;`, { type: sequelize.QueryTypes.SELECT })
    return results
}

exports.getCountOfTable = async (tblColumn, tblName) => {
    const results = await sequelize.query(`SELECT COUNT(${tblColumn}) AS count FROM ${tblName}`, { type: sequelize.QueryTypes.SELECT })
    return results[0].count
}

exports.deleteUser = async (id) => {
    const results = await sequelize.query(`DELETE FROM tblEntidad WHERE idEntidad = ${id}`)
    console.log(results)
    return;
}

exports.getAreasName = async () => {
    const results = await sequelize.query(`SELECT NombreArea FROM tblAreaEncargada`, { type: sequelize.QueryTypes.SELECT });
    return results;
}
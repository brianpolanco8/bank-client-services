const sequelize = require('../data')
const moment = require('moment')

exports.getAllUsers = async () => {
    const results = await sequelize.query(`
        SELECT * FROM tblEntidad
            INNER JOIN tblCliente on tblCliente.idEntidad = tblEntidad.idEntidad;`, { type: sequelize.QueryTypes.SELECT })
    return results
}

exports.getCountOfTable = async (tblColumn, tblName) => {
    const results = await sequelize.query(`
        SELECT COUNT(${tblColumn}) AS count FROM ${tblName}`, { type: sequelize.QueryTypes.SELECT })
    return results[0].count
}

exports.getAllRequestsInfo = async () => {
    const results = await sequelize.query(`
        SELECT * FROM tblSolicitudHeader
            INNER JOIN tblSolicitudDetail on tblSolicitudDetail.idSolicitud = tblSolicitudHeader.idSolicitud
                INNER JOIN tblCliente on tblCliente.idCliente = tblSolicitudHeader.idCliente
                    INNER JOIN tblEntidad on tblEntidad.idEntidad = tblCliente.idEntidad
                        INNER JOIN tblAreaEncargada on tblAreaEncargada.idArea = tblSolicitudDetail.idArea;`, { type: sequelize.QueryTypes.SELECT })
    return results
}

exports.getAreasName = async () => {
    const results = await sequelize.query(`SELECT * FROM tblAreaEncargada`, { type: sequelize.QueryTypes.SELECT });
    return results;
}

exports.getLocations = async () => {
    const results = await sequelize.query(`SELECT * FROM tblSucursal;`, { type: sequelize.QueryTypes.SELECT })
    return results
}

exports.getAllCustomers = async () => {
    const results = await sequelize.query(`
        SELECT * FROM tblEntidad
            INNER JOIN tblPersonal on tblPersonal.idEntidad = tblEntidad.idEntidad;`, { type: sequelize.QueryTypes.SELECT })
    return results
}

exports.postRequests = async (idSucursal, idArea, Tipo, Descripcion, idCliente, idPersonal) => {
    await sequelize.query(`INSERT INTO tblSolicitudDetail(idSucursal, idArea,Tipo,Descripcion) VALUES (${idSucursal}, ${idArea}, '${Tipo}', '${Descripcion}')`)
    await sequelize.query(`INSERT INTO tblSolicitudHeader(idCliente, idPersonal, idSolicitud, FechaCreacion, FechaActualizacion) VALUES (${idCliente}, ${idPersonal}, LAST_INSERT_ID(), '${moment().format("YYYY-MM-DD HH:mm:ss")}', '${moment().format("YYYY-MM-DD HH:mm:ss")}')`)
    return;
}

exports.editRequests = async (idSolicitudCliente, idSolicitud, idSucursal, idArea, Tipo, Descripcion, idCliente, idPersonal) => {
    await sequelize.query(`UPDATE tblSolicitudHeader SET idCliente= ${idCliente}, idPersonal = ${idPersonal}, FechaActualizacion = ${moment().format("YYYY-MM-DD HH:mm:ss")} WHERE idSolicitudCliente = ${idSolicitudCliente}`)

    await sequelize.query(`UPDATE tblSolicitudDetail SET idSucursal = ${idSucursal}, idArea = ${idArea}, Tipo = ${Tipo}, Descripcion = ${Descripcion} WHERE idSolicitud = ${idSolicitud}`)
}

exports.postUsers = async (cedula, Nombre, Apellido, Direccion, Provincia, Telefono, Correo) => {
    await sequelize.query(`INSERT INTO tblEntidad (
        cedula, Nombre, Apellido, Direccion, Provincia, Telefono, Correo) VALUES
        ('${cedula}', '${Nombre}', '${Apellido}', '${Direccion}', '${Provincia}', '${Telefono}', '${Correo}')`);
    await sequelize.query(`INSERT INTO tblCliente (idEntidad) VALUES (LAST_INSERT_ID())`)
}

exports.postCustomer = async (cedula, Nombre, Apellido, Direccion, Provincia, Telefono, Correo) => {
    await sequelize.query(`INSERT INTO tblEntidad (
        cedula, Nombre, Apellido, Direccion, Provincia, Telefono, Correo) VALUES
        ('${cedula}', '${Nombre}', '${Apellido}', '${Direccion}', '${Provincia}', '${Telefono}', '${Correo}')`);
    await sequelize.query(`INSERT INTO tblPersonal  (idEntidad) VALUES (LAST_INSERT_ID())`)
}


exports.deleteUser = async (id) => {
    const results = await sequelize.query(`DELETE FROM tblEntidad WHERE idEntidad = ${id}`)
    console.log(results)
    return;
}

exports.deleteRequest = async (id) => {
    const results = await sequelize.query(`DELETE FROM tblSolicitudHeader WHERE idSolicitudCliente = ${id}`)
    console.log(results)
    return;
}

exports.deleteCustomer = async (id) => {
    const results = await sequelize.query(`DELETE FROM tblEntidad WHERE idEntidad = ${id}`)
    console.log(results)
    return;
}

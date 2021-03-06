const userQueries = require('../queries').userQueries

exports.getHomePage = async (req, res) => {

    const usersCount = await userQueries.getCountOfTable('idCliente', 'tblCliente')
    const requestsCount = await userQueries.getCountOfTable('idSolicitudCliente', 'tblSolicitudHeader')
    console.log('users', usersCount)
    res.render('home', {
        usersCount,
        requestsCount,
        pageTitle: 'Home'
    })
}

exports.getRequestsPage = async (req, res) => {
    const requestsInfo = await userQueries.getAllRequestsInfo()
    const users = await userQueries.getAllUsers()
    const customers = await userQueries.getAllCustomers()
    const areas = await userQueries.getAreasName()
    const locations = await userQueries.getLocations()
    res.render('requests', {
        pageTitle: 'Solicitudes',
        users,
        areas,
        locations,
        customers,
        requestsInfo
    })
    // res.status(200).send('users', users)
}

exports.getClientsPage = async (req, res) => {
    const users = await userQueries.getAllUsers()
    res.render('clients', {
        users,
        pageTitle: 'Clientes'
    })
}

exports.getCustomersPage = async (req, res) => {
    const users = await userQueries.getAllCustomers()
    res.render('customers', {
        users,
        pageTitle: 'Clientes'
    })
}

exports.postRequests = async (req, res) => {
    const { idCliente, idPersonal, idSucursal, Tipo, idArea, Descripcion } = req.body
    console.log(req.body)
    await userQueries.postRequests(idSucursal, idArea, Tipo, Descripcion, idCliente, idPersonal)
    res.redirect('/requests')

}

exports.editRequests = async (req, res) => {
    const { idSolicitudCliente, idSolicitud, idCliente, idPersonal, idSucursal, Tipo, idArea, Descripcion } = req.body
    await userQueries.editRequests(idSolicitudCliente, idSolicitud, idSucursal, idArea, Tipo, Descripcion, idCliente, idPersonal)
    res.redirect('/requests')
    console.log(req.body)
}

exports.postClients = async (req, res) => {
    const { Cedula, Nombre, Apellido, Direccion, Provincia, Telefono, Correo } = req.body
    console.log(req.body)
    await userQueries.postUsers(Cedula, Nombre, Apellido, Direccion, Provincia, Telefono, Correo)
    res.redirect('/clients')

}

exports.postCustomer = async (req, res) => {
    const { Cedula, Nombre, Apellido, Direccion, Provincia, Telefono, Correo } = req.body
    console.log(req.body)
    await userQueries.postCustomer(Cedula, Nombre, Apellido, Direccion, Provincia, Telefono, Correo)
    res.redirect('/customers')

}

exports.deleteUser = async (req, res) => {
    const id = req.body.userId
    await userQueries.deleteUser(id)
    res.redirect('/clients')
}

exports.deleteRequest = async (req, res) => {
    const { idSolicitudCliente } = req.body
    await userQueries.deleteRequest(idSolicitudCliente)
    res.redirect('/requests')
}

exports.deletePersonal = async (req, res) => {
    const id = req.body.userId
    await userQueries.deleteCustomer(id)
    res.redirect('/customers')
}
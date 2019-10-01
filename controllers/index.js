const userQueries = require('../queries').userQueries

exports.getHomePage = async (req, res) => {

    const usersCount = await userQueries.getCountOfTable('idCliente', 'tblCliente')
    const requestsCount = await userQueries.getCountOfTable('idSolicitudCliente', 'tblSolicitudHeader')
    console.log('users', usersCount)
    res.render('home', {
        usersCount,
        requestsCount,
        pageTitle: 'Dashboard'
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

exports.postRequests = async (req, res) => {
    const { idCliente, idPersonal, idSucursal, Tipo, idArea, Descripcion } = req.body
    console.log(req.body)
    await userQueries.postRequests(idSucursal, idArea, Tipo, Descripcion, idCliente, idPersonal)
    res.redirect('/requests')

}

exports.deleteUser = async (req, res) => {
    const id = req.body.userId
    await userQueries.deleteUser(id)
    res.redirect('/requests')
}

exports.deleteRequest = async (req, res) => {
    const { idSolicitudCliente } = req.body
    await userQueries.deleteRequest(idSolicitudCliente)
    res.redirect('/requests')
}
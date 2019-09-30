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
    const users = await userQueries.getAllUsers()
    const areas = await userQueries.getAreasName()
    res.render('requests', {
        pageTitle: 'Solicitudes',
        users,
        areas
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

exports.deleteUser = async (req, res) => {
    const id = req.body.userId
    await userQueries.deleteUser(id)
    res.redirect('/requests')
}
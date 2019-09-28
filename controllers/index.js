const userQueries = require('../queries').userQueries

exports.getHomePage = async (req, res) => {

    const usersCount = await userQueries.getCountOfTable()
    console.log('users', usersCount)
    res.render('home', {
        // users,
        usersCount: usersCount,
        pageTitle: 'Home'
    })
}

exports.getRequestsPage = async (req, res) => {
    const users = await userQueries.getAllUsers()
    // console.log('users', users)
    res.render('requests', {
        pageTitle: 'Requests',
        users
    })
    // res.status(200).send('users', users)
}

exports.deleteUser = async (req, res) => {
    const id = req.body.userId
    await userQueries.deleteUser(id)
    res.redirect('/requests')
}
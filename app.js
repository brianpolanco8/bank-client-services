const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const sequelize = require('./data')
const ejs = require('ejs')
app.use(bodyParser.urlencoded({ extended: false }))
const query = require('./queries')

app.get('/', async (req, res) => {
    const users = await handleSelect('users')
    const usersCount = await query.getCountOfTable('users', 'firstname')
    console.log(typeof (usersCount.usersCount))
    res.render('home', {
        users,
        usersCount: usersCount.usersCount,
        pageTitle: 'Home'
    })
    res.status(200).send(usersCount)
})

app.set('view engine', 'ejs')
app.set('views', 'views')
app.use('/public', express.static('public'));


const handleSelect = async (tblName) => {
    const result = await sequelize.query(`SELECT * FROM ${tblName} WHERE identification =  00198680115`, { type: sequelize.QueryTypes.SELECT })
    return result[0]
}


const PORT = 5000 || process.env.PORT

app.listen(PORT, () => {
    console.log('server running on port 5000')
})
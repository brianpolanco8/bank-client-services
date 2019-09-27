const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const data = require('./data')
const ejs = require('ejs')
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
    // console.log('working')
    const users = await handleSelect('users')
    res.render('home', {
        users,
        pageTitle: 'Home'
    })
    // res.status(200).send(users)
})

app.set('view engine', 'ejs')
app.set('views', 'views')
app.use('/public', express.static('public'));


const handleSelect = async (tblName) => {
    const result = await data.sequelize.query(`SELECT * FROM ${tblName} WHERE identification =  00198680115`, { type: data.sequelize.QueryTypes.SELECT })
    return result
}


const PORT = 5000 || process.env.PORT

app.listen(PORT, () => {
    console.log('server running on port 5000')
})
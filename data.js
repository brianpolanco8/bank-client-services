const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('adminbhdleon', 'root', 'root', {
    host: '127.0.0.1',
    dialect: 'mysql',
    username: 'root',
    password: 'root'
});



sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize
const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

// const sequelize = new Sequelize('DB_CLIENT_SERVICES', 'brianpolanco', 'Strongpassword12', {
//     host: '127.0.0.1',
//     dialect: 'mysql',
//     username: 'root',
//     password: 'root'
// });


sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize
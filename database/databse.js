const Sequelize = require('sequelize')

const sequelize = new Sequelize('expensefull','root','mayur123@#',{
    host:'localhost',
    dialect:'mysql'
})


module.exports = sequelize


const express = require('express')

const path = require('path')
const bodyParser = require('body-parser')

const sequelize = require('./database/databse')
const rootDir = require('./util/path')

var cors = require('cors')

const expenseRoute = require('./routes/routes')

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())

app.use(expenseRoute)

sequelize
.sync()
.then(result => {
    app.listen(8000,() => {
        console.log('Server is listening on port 8000');
    })
})



const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

//routing
const userRoutes = require('./api/routes/user')

//connect to mongodb
mongoose.connect('mongodb://localhost/testDB', {useNewUrlParser: true})


//middleware
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

//test route
app.get('/', function(req, res){
    res.json({
        name : 'pakorn'
    })
})

//route handle request
app.use('/user', userRoutes)


app.use((req, res, next) => {
    const error = new Error('not found')
    error.status = 404
    next(error)  
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app
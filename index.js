const express = require('express')
const app = express()
app.use(express.json())

const env = require('dotenv').config()
const port = process.env.portNumber

const databaseConnection = require('./config/databaseConnection')
const userDB = require('./model/userSchema')

const jwt = require('jsonwebtoken')

const router = express.Router()
app.use('/',router)
require('./controller/userController')(router,userDB,jwt)
require('./controller/loginSignupController')(router,userDB,jwt)
// const  route= require('./routes/router')
// route(app)

app.listen(port,()=>{
    console.log(`server is being started @ ${port}`)
})
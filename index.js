const express = require('express');
const path = require('path')
const cookieParser = require('cookie-parser')

const {connectToMongoDB} = require('./connectDB')
const URL = require('./models/urlModel')
const {checkForAuthorization, restrictTo} = require('./middlewares/auth')

const urlRoutes = require('./routes/urlRoutes')
const staticRoutes = require('./routes/staticRouter')
const userRoutes = require('./routes/userRoutes')

const app = express()
const PORT = 8001

// MongoDb connection 
connectToMongoDB('mongodb://127.0.0.1:27017/short-url')

// Set view engine as "ejs" 
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(checkForAuthorization)

// Routes

app.use('/url', restrictTo(["NORMAL","ADMIN"]) ,urlRoutes)
app.use('/user', userRoutes)
app.use('/', staticRoutes)




//Web Server Connection
app.listen(PORT, ()=>{
    console.log(`✅ Server started : http://localhost:${PORT}` )
})
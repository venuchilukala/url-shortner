const express = require('express')
const router = express.Router()

const { handleUserSignup, handleUserLogin } = require('../controllers/userController')

router
    .route('/signup')
    .post(handleUserSignup)

router
    .route('/login')
    .post(handleUserLogin)

module.exports = router
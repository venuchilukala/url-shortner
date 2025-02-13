const express = require('express')
const {handleAdmin,handleHome, handleSignup, handleLogin} = require('../controllers/staticController')

// Middlewares
const { restrictTo } = require('../middlewares/auth')

const router = express.Router()

router.route('/signup').get(handleSignup)
router.route('/login').get(handleLogin)
router.route('/admin/urls').get(restrictTo(["ADMIN"]),handleAdmin)
router.route('/').get(restrictTo(["NORMAL","ADMIN"]), handleHome)

module.exports = router;
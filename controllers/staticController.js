const URL = require('../models/urlModel')

const handleAdmin = async (req, res) => {
    const allUrls = await URL.find({})
    return res.render("home", {
        urls: allUrls
    })
}

const handleHome = async (req, res) => {
    const allUrls = await URL.find({ createdBy: req.user._id })
    return res.render("home", {
        urls: allUrls
    })
}

const handleSignup = async (req, res) => {
    return res.render('signup')
}

const handleLogin = async (req, res) => {
    return res.render('login')
}

module.exports = {
    handleAdmin,
    handleHome,
    handleSignup,
    handleLogin
}
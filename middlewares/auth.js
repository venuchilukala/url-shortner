const { getUser } = require('../service/auth')

// Authentication
const checkForAuthorization = (req, res, next) => {
    const tokenCookie = req.cookies?.token;
    req.user = null
    // Here just check whether user logged in or not
    if (!tokenCookie) return next()
    const token = tokenCookie
    const user = getUser(token)
    req.user = user
    return next()
}

// Authorization
const restrictTo = (roles = []) => {
    return function (req, res, next) {
        if (!req.user) return res.redirect('/login')

        if (!Array.isArray(roles) || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        return next()
    }
}


module.exports = {
    checkForAuthorization,
    restrictTo
}
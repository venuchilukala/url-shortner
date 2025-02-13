const jwt = require('jsonwebtoken')

const secretKey = "venu@568#**"

function setUser(user) {

    return jwt.sign({
        _id: user._id,
        role: user.role
    }, secretKey)
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null
    }
}

module.exports = {
    setUser,
    getUser
}


// Here we maintaing state in statefull auth
// const sessionIdToUserMap = new Map();

// function setUser(id, user){
//     sessionIdToUserMap.set(id, user);
// }

// function getUser(id){
//     return sessionIdToUserMap.get(id);
// }

// module.exports = {
//     setUser,
//     getUser
// }
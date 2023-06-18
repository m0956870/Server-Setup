const jwt = require("jsonwebtoken")

const signJWT = (id) => {
    let token = jwt.sign({id}, process.env.JWT_SECRET_KEY)
    return token;
}

module.exports = signJWT
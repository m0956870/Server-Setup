const jwt = require("jsonwebtoken");
const { ApiError } = require("../errorHandler");

const verifyJWT = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY)
    } catch (error) {
        throw new ApiError("Access Token Invalid", 401)
    }
}

module.exports = verifyJWT
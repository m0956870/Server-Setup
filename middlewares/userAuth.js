const { ApiError } = require("../errorHandler");
const User = require("../models/userModel");
const { verifyJWT } = require("../utils");

const userAuth = async (req, res, next) => {
    try {
        const header = req.header("Authorization");
        if (!header) throw new ApiError("No header present in the request!.", 400);
        const token = header.split(" ")[1];
        if (!token || token == "undefined") throw new ApiError("Token is required!", 401);
        
        let verifiedUser = verifyJWT(token)
        const user = await User.findById(verifiedUser.id)
        if(!user) throw new ApiError("User not found!", 404)
        req.user = user

        next();
    } catch (error) {
        next(error);
    }
}

module.exports = userAuth
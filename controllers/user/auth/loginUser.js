const bcrypt = require("bcrypt")
const { ApiError } = require("../../../errorHandler")
const User = require("../../../models/userModel")
const { signJWT } = require("../../../utils")

const loginUser = async (req, res, next) => {
    // console.log("loginUser", req.body)
    try {
        let { email, password } = req.body
        if (!email) throw new ApiError("Email is required!", 400);
        if (!password) throw new ApiError("Password is required!", 400);

        let user = await User.findOne({ email })
        if (!user) throw new ApiError("User does not exist!", 404)

        let passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch || email !== user.email) throw new ApiError("Invalid credentials!", 404)

        let token = signJWT(user._id)
        // res.cookie("auth_token", token, { maxAge: 1000 * 60 * 24 * 30, httpOnly: true })

        res.status(200).json({ status: true, message: "User logged in successfully!", data: { token, user } })
    } catch (error) {
        next(error)
    }
}

module.exports = loginUser
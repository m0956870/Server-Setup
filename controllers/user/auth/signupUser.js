const bcrypt = require("bcrypt")
const { ApiError } = require("../../../errorHandler");
const User = require("../../../models/userModel");

const signupUser = async (req, res, next) => {
    // console.log("signupUser", req.body)
    try {
        let { name, username, email, phone_number, password } = req.body

        if (!name) throw new ApiError("Name is required!", 400)
        if (!username) throw new ApiError("Username is required!", 400)
        if (!email) throw new ApiError("Email is required!", 400)
        if (!phone_number) throw new ApiError("Phone Number is required!", 400)
        if (isNaN(phone_number)) throw new ApiError("Phone Number is invalid!", 400)
        if (!password) throw new ApiError("Password is required!", 400)

        let existingUser = await User.findOne({ email })
        if (existingUser) throw new ApiError("Email already exist!", 400);

        let salt = await bcrypt.genSalt(10)
        let hashPass = await bcrypt.hash(password, salt)

        let user = await User.create({ name, username, email, phone_number, password: hashPass })
        res.status(201).json({ status: true, message: "User created successfully!", data: user })
    } catch (error) {
        next(error)
    }
}

module.exports = signupUser
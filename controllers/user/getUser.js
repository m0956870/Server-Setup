const { ApiError } = require("../../errorHandler");
const User = require("../../models/userModel");

const getUser = async (req, res, next) => {
    // console.log("getUser", req.params);
    try {
        if (!req.params.id) throw new ApiError("ID is required!", 400);
        let user = await User.findById(req.params.id).select("-password -is_delete -__v")
        res.status(200).json({
            status: true,
            message: "User fetched successfully!",
            data: user
        })
    } catch (error) {
        next(error);
    }
};

module.exports = getUser;
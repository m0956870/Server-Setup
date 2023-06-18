const User = require("../../models/userModel");

const deleteUser = async (req, res, next) => {
    // console.log("deleteUser", req.params);
    try {
        // let user = await User.findByIdAndDelete(req.params.id)
        let user = await User.findByIdAndUpdate(req.params.id, { is_delete: true }, { new: true })
        res.status(200).json({
            status: true,
            message: "User deleted successfully!",
            data: user
        })
    } catch (error) {
        next(error);
    }
};

module.exports = deleteUser;
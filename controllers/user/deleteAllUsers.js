const User = require("../../models/userModel");

const deleteAllUsers = async (req, res, next) => {
    // console.log("deleteAllUsers");
    try {
        await User.deleteAllUsers();
        res.status(200).json({ status: true, message: "All Users deleted successfully!", });
    } catch (error) {
        next(error);
    }
};

module.exports = deleteAllUsers;
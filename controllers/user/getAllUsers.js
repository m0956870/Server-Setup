const User = require("../../models/userModel");

const getAllUsers = async (req, res, next) => {
    // console.log("getAllUsers", req.query);
    try {
        let { page, limit, name, email, phone } = req.query;
        page = page ? page : "1";
        limit = limit ? limit : "10";

        const findConditions = { is_delete: false, status: true }
        if (name) findConditions.name = { $regex: new RegExp(name, "i") }
        if (email) findConditions.email = { $regex: new RegExp(email, "i") }
        if (phone) findConditions.phone_number = { $regex: new RegExp(phone, "i") }

        let allUsersCount = await User.countDocuments({ is_delete: false });
        if (allUsersCount === 0) return res.status(200).json({ status: true, message: "No users found!" });

        let users = await User.find(findConditions)
            .skip((page * limit) - limit)
            .limit(limit)
            .sort({ createdAt: -1 })
            .select("-password -is_delete -__v")

        res.status(200).json({
            status: true,
            message: "All users fetched successfully!",
            totalUsers: allUsersCount,
            totalPages: Math.ceil(allUsersCount / limit),
            data: users,
        })
    } catch (error) {
        next(error);
    }
};

module.exports = getAllUsers;
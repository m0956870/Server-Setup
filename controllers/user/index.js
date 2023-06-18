// auth
const loginUser = require("../user/auth/loginUser");
const signupUser = require("./auth/signupUser");
const forgetPassword = require("./auth/forgetPassword");
const resetPassword = require("./auth/resetPassword");

const getAllUsers = require("./getAllUsers");
const getUser = require("./getUser");
const getProfileDetails = require("./getProfileDetails");

const updateProfile = require("./updateProfile");
const updateProfileImage = require("./updateProfileImage");

const deleteUser = require("./deleteUser");
const deleteAllUsers = require("./deleteAllUsers");

module.exports = {
    // auth
    loginUser: loginUser,
    signupUser: signupUser,
    forgetPassword: forgetPassword,
    resetPassword: resetPassword,

    getAllUsers: getAllUsers,
    getUser: getUser,
    getProfileDetails: getProfileDetails,

    updateProfile: updateProfile,
    updateProfileImage: updateProfileImage,

    deleteUser: deleteUser,
    deleteAllUsers: deleteAllUsers,
}
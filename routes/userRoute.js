const userRouter = require("express").Router();
const { userAuth } = require("../middlewares");
const { loginUser, signupUser, forgetPassword, resetPassword,
    getAllUsers, getUser, getProfileDetails,
    updateProfile, updateProfileImage,
    deleteUser, deleteAllUsers, } = require("../controllers/user");

// get
userRouter.get("/all", getAllUsers);
userRouter.get("/detail/:id", getUser);
userRouter.get("/profile", userAuth, getProfileDetails);

// post

// patch
userRouter.patch("/profile", userAuth, updateProfile)
userRouter.patch("/profile_image", userAuth, updateProfileImage);
// userRouter.patch("/password", userAuth, updateProfileImage)

// delete
userRouter.delete("/:id", deleteUser);
userRouter.delete("/delete_all", deleteAllUsers);

// auth
userRouter.post("/login", loginUser);
userRouter.post("/signup", signupUser);
userRouter.post("/forget_password", forgetPassword);
userRouter.post("/reset_password", resetPassword);


module.exports = userRouter;
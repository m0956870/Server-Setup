const { ApiError } = require("../../errorHandler");
const User = require("../../models/userModel");

const fs = require("fs");
const multer = require("multer");
const { baseUrl } = require("../../utils");

const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        if (!fs.existsSync("public/images")) fs.mkdirSync("public/images", { recursive: true })
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        // console.log("file", file)
        cb(null, Date.now() + file.originalname)
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, //10mb
    fileFilter: (req, file, cb) => {
        allowedMimeTypes.includes(file.mimetype)
            ? cb(null, true)
            : cb(new ApiError("Invalid image type!", 400))
    },
}).single("image")


const updateProfile = async (req, res, next) => {
    // console.log("updateProfile")
    upload(req, res, async (error) => {
        try {
            if (error) return next(error);

            const { id } = req.body;
            if (!id) throw new ApiError("User ID is required", 400);

            const user = req.user;
            let oldImage = req.user.profile_image;
            let { name, username, email, phone_number, status } = req.body;

            if (name) user.name = name;
            if (username) user.username = username;
            if (email) user.email = email;
            if (phone_number) user.phone_number = phone_number;
            if (status) user.status = status;
            if (req.file) user.profile_image = baseUrl() + "/images/" + req.file.filename;

            // let user = await User.findByIdAndUpdate(id, updatedObj, { new: true }).select("-password -is_delete -__v");
            await user.save();
            deleteImageHandler(oldImage);
            res.status(200).json({ status: true, message: "User details updated successfully!", data: user });
        } catch (error) {
            next(error);
        }
    })
}

function deleteImageHandler(image) {
    if (!image) return;
    if (fs.existsSync(`public/images/${image.split("images/")[1]}`)) {
        fs.unlink(`public/images/${image.split("images/")[1]}`, (err) => {
            if (err) return console.log("Error in deleting image!");
            console.log("Image deleted successfully.");
        });
    };
};

module.exports = updateProfile;
const fs = require("fs")
const multer = require("multer");
const { ApiError } = require("../../errorHandler");

const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync('public/images')) fs.mkdirSync('public/images', { recursive: true });
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        // console.log("file", file)
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 Mb
    fileFilter: (req, file, cb) => {
        allowedMimeTypes.includes(file.mimetype)
            ? cb(null, true)
            : cb(new ApiError('Invalid image type!', 400));
    },
}).single("image");

const updateProfileImage = async (req, res, next) => {
    console.log("updateProfileImage", req.body)
    try {
        upload(req, res, async (err) => {
            if (err) return next(err)
            
            if (req.file) {
                console.log(req.file)
            } else {
                console.log("no req.file")
            }
            // console.log(req.file);
            // if (err) return console.log("error uploading the image.");
            // // await User.findByIdAndUpdate(req.user._id, { profile_pic: `${base_url}${req.file.path}` });
            // res.status(200).json({ status: true, message: "Profile pic updated successfully." });
        });
    } catch (error) {
        next(error)
    }
}

module.exports = updateProfileImage
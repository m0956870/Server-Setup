const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        username: {
            type: String,
        },
        email: {
            type: String,
        },
        profile_image: {
            type: String,
        },
        phone_number: {
            type: String,
        },
        password: {
            type: String,
        },
        otp: {
            type: String,
        },
        reset_password_token: {
            type: String,
        },
        is_delete: {
            type: Boolean,
            default: false,
        },
        status: {
            type: Boolean,
            default: true,
        }
    },
    {
        collection: 'users',
        timestamps: true,
    }
);

const User = mongoose.model('user', userSchema);
module.exports = User;
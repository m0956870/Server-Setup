const forgetPassword = async (req, res, next) => {
    // console.log("forgetPassword", req.body)
    try {
        res.send("forgetPassword")
    } catch (error) {
        next(error)
    }
}

module.exports = forgetPassword
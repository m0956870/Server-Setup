const resetPassword = async (req, res, next) => {
    // console.log("resetPassword", req.body)
    try {
        res.send("resetPassword")
    } catch (error) {
        next(error)
    }
}

module.exports = resetPassword
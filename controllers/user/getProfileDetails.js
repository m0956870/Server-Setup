const getProfileDetails = async (req, res, next) => {
    // console.log("getProfileDetails", req.body)
    try {
        res.status(200).json({ status: true, data: req.user })
    } catch (error) {
        next(error)
    }
}

module.exports = getProfileDetails
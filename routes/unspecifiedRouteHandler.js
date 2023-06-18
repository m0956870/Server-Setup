const unspecifiedRouteHandler = (req, res, next) => {
    res.status(200).json({ status: true, message: 'Route not found! Please check your URL' });
}

module.exports = unspecifiedRouteHandler
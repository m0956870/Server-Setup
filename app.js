const express = require("express");
const app = express();
const unspecifiedRouteHandler = require("./routes/unspecifiedRouteHandler");
const { finalErrorHandler } = require("./errorHandler");
const cors = require("cors");

app.use(cors());
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

app.use("/images", express.static("public/images"));

// web urls
app.use("/user", require("./routes/userRoute"));
app.get('/test',(_, res)=> res.send('test successful.'));

// error handlers
app.use(unspecifiedRouteHandler);
app.use(finalErrorHandler)

module.exports = app;
require("dotenv").config()
const app = require("./app");
const connectToDBFunc = require("./db");

const HOST = process.env.HOST
const PORT = process.env.PORT

const initializeServer = async () => {
    try {
        await connectToDBFunc()
        app.listen(PORT, () => console.log(`Server is running on http://${HOST}:${PORT}`))
            .on('error', () => {
                console.log('Unable to initialise server.');
                process.exit(1);
            });
    } catch (error) {
        console.log('Database Connection Failed', error.message);
        process.exit(1);
    }
}

initializeServer()
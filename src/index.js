
const express = require('express');
const expressApp = require('./api/express-app');
const logger = require('./api/logger/logger');





const StartServer = async () => {
    const PORT = process.env.PORT || 3000;
    const app = express();
    const server = require("http").createServer(app);

    app.use('/api/logs', express.static('app.log'));
    app.use('/api/erros', express.static('error.log'));
    await expressApp(app);

    server.listen(PORT, () => {
        console.log("Server running on port " + PORT);
    })
        .on('error', (err) => {
            logger.error(err)
            process.exit();
        })
}




StartServer();
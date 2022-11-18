
const cors = require("cors");
const cookieParser = require("cookie-parser");

const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};

const bodyParser = require("body-parser");
const { errorHandler } = require("./middleware/error-handler");
const router = require('./routers/file');

module.exports = async (app) => {

    app.use(cors(corsOptions));

    app.use(cookieParser());


    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json({ limit: "1024mb" }));
    app.use(bodyParser.urlencoded({ limit: "1024mb", extended: true }));

    app.use((req, res, next) => {
        next();
    });


    app.get("/api/ping", (req, res) => {
        res.send("<h4>   Service is up!! </h4>");
    })


    app.use('/api/file', router);


    // error handling
    app.use(errorHandler);

}
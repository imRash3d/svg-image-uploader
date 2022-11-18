const logger = require("../logger/logger");

function sendError(res, options) {
    const code = options && options.code ? options.code : 400;

    let message = options && options.msg ? options.msg : null;
    let fm = "Unknown error";

    if (message !== null && message !== undefined) {
        if (
            message.length &&
            typeof message[0] === "object" &&
            message[0].msg &&
            message[0].param
        ) {
            fm = message[0].msg;
        } else if (typeof message === "string") {
            fm = message;
        } else if (typeof message === "object") {
            if (message.code && message.severity) {
                fm = message.severity + " - " + message.code;
            } else if (message.msg) {
                fm = message.msg;
            } else if (message.message) {
                fm = message.message;
            }
        }
    }
    if (!res.headersSent) {
        if (res) {
            logger.error(fm)
            res.status(code).json({ msg: fm });
        }
    }
}

module.exports = {
    sendError
}
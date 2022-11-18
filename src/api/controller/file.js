var path = require('path');
const { LineChartSmall } = require('../../charts/lineChartSmall');
const logger = require('../logger/logger');
const { sendError } = require('../utility/utils');


const getSmallChartImageBuffer = async (req, res) => {

    try {
        // console.log(req.body)
        if (!req.body.Historical) {
            sendError(res, { msg: "Historical data not found" });
            return;
        }
        const imageBuffer = await LineChartSmall(req.body);


        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        logger.info(`Stock Symbol ${req.body.Symbol} uses approximately ${Math.round(used * 100) / 100} MB`);

        res.send(imageBuffer)
    }
    catch (err) {
        console.log(err)
        //  sendError(res, { msg: err });
    }


};







module.exports = {
    getSmallChartImageBuffer
}



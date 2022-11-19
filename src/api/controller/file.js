var path = require('path');
const { LineChart } = require('../charts/lineChart');
const { LineChartSmall } = require('../charts/lineChartSmall');
const logger = require('../logger/logger');
const { sendError } = require('../utility/utils');


const getSmallChartImageBuffer = async (req, res) => {
    executeHttpCall(req, res, 'small')
};

const executeHttpCall = async (req, res, type) => {


    try {

        if (!req.body.Historical) {
            sendError(res, { msg: "Historical data not found" });
            return;
        }
        const imageBuffer = type == 'small' ? await LineChartSmall(req.body) : await LineChart(req.body);


        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        logger.info(`Stock Symbol ${req.body.Symbol} uses approximately ${Math.round(used * 100) / 100} MB`);

        res.send(imageBuffer)
    }
    catch (err) {

        sendError(res, { msg: err });
    }

}



const getChartImageBuffer = async (req, res) => {
    executeHttpCall(req, res, 'large')
};



module.exports = {
    getSmallChartImageBuffer,
    getChartImageBuffer
}



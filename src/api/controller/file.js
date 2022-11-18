var path = require('path');
const { LineChartSmall } = require('../../charts/lineChartSmall');
const { sendError } = require('../utility/utils');


const getSmallChartImageBuffer = async (req, res) => {

    try {
        if (!req.body.Historical) {
            sendError(res, { msg: "Historical data not found" });
            return;
        }
        const imageBuffer = await LineChartSmall(req.body);
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);

        res.send(imageBuffer)
    }
    catch (err) {
        sendError(res, { msg: err });
    }


};







module.exports = {
    getSmallChartImageBuffer
}



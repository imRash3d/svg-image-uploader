var path = require('path');
const { LineChartSmall } = require('../../charts/lineChartSmall');
const { generateChart } = require('./chart');

const getFile = async (req, res) => {



    const svgText = await LineChartSmall(null,null);
    console.log()

    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
    res.send(Buffer.from(svgText, 'base64'))
   // res.send(base64)
};







module.exports = {
    getFile
}



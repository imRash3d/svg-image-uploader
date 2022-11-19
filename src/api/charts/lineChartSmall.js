

const D3Node = require('d3-node');

const svg2png = require('svg-png-converter').svg2png;
const d3n = new D3Node();
const d3 = d3n.d3
jsdom = require("jsdom");
const { JSDOM } = jsdom;


// global variable 
const colorCode = '#CC0000';
var width = 300;
var height = 150;
var x;
var y;
var svg;
var y0;





const LineChartSmall = async (data) => {


    const _data = data.Historical.map(y => {

        return {
            date: new Date(y.Date),
            value: Number(y.Close),
            Open: Number(y.Open),
            Close: Number(y.Close),
        };
    });

    // console.log(_data)



    const { document } = (new JSDOM('')).window;
    global.document = document;
    var body = d3.select(document).select("body");


    // set Canvas height width




    svg = body.append("svg")  // create svg with canvas height width 
        .style('background-color', 'white')
        .attr("width", width)
        .attr("height", height)
        .append('g');



    configureXaxis(_data);
    configureYaxis(_data);
    drawGridlines();
    drawLinePath(_data);


    return await svg2png({
        input: body.node().innerHTML.trim(),
        encoding: 'dataURL',
        format: 'png',
        quality: 1
    })


}





function drawLinePath(_data) {
    const valueLine = d3
        .line()
        .x((d) => x(d['date']))
        .y((d) => y0(d['value']));

    const line = svg
        .append('path')
        .datum(_data)
        .attr('stroke', colorCode)
        .attr('stroke-width', 1)
        .attr('fill', 'none')
        .attr('d', valueLine);
    valueLine.curve(d3.curveCardinal);
}


function configureYaxis(_data) {
    const yAxisList = [];
    // range of data configuring

    let yRange = d3.extent(_data, d => d.value);
    // If we have data then make the Y range one less than the
    // smallest value so we have space between the bottom-most part
    // of the line and the X-axis
    if (yRange && yRange.length > 1 && yRange[0] !== yRange[yRange.length - 1] && yRange[0] < 5) {
        console.log(yRange[0]);
        yRange[0] -= 0.1;
    }


    y0 = d3
        .scaleLinear()
        .range([height, 0])
        .domain(yRange);

    const _yXxis0 = d3.axisLeft(y0).ticks(10).tickFormat(d3.format('.1f'));
    yAxisList.push(_yXxis0);

    yAxisList.forEach((_yAxis, i) => {
        const yaxisLine = svg.append('g').attr('class', 'axis axis--y--' + i);

        const space = {
            1: 5,
            2: 50
        };
        if (i == 1 || i == 2) {
            yaxisLine.attr('transform', `translate(${width + space[i]},0)`);
        }

        yaxisLine
            .call(_yAxis)
            .select('.domain')
            .attr('stroke', '#ccc')
            .attr('stroke-width', '1');
    });

    // Add the Y-axis definition to the left part of the chart
}

function configureXaxis(data) {

    // range of data configuring, in this case we are
    // showing data over a period of time
    x = d3.scaleLinear()
        .range([0, width])
        .domain(d3.extent(data, d => d.date));

    // Add the X-axis definition to the bottom of the chart
    svg
        .append('g')
        .attr('transform', 'translate(0,' + (height) + ')')
        .call(d3.axisBottom(x))
        .select('.domain')
        .attr('stroke', '#000')
        .attr('stroke-width', '1')
        .attr('opacity', '.4')
        .style('stroke-dasharray', '5, 5')
        .selectAll('text')
        .attr('dx', '-2em')
        .attr('dy', '.15em')
        .attr('transform', 'rotate(-65)');
}


function drawGridlines() {

    var y1Gridlines = d3
        .axisRight(y0)
        // .tickFormat("")
        .tickSize(width);

    var gridY = svg.append('g').attr('class', 'd3-grid').call(y1Gridlines);
    gridY.selectAll('text').remove();

    gridY.selectAll('line').style('opacity', '.2').style('stroke', 1);

    gridY
        .select('.domain')
        .attr('stroke-width', '1')
        .attr('opacity', '0')
        .style('stroke-dasharray', '5, 5')
        .style('padding', '0 5px');

    gridY.call(y1Gridlines);

}







module.exports = {
    LineChartSmall

};
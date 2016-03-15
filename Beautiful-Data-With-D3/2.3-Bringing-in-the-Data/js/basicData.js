
var dataset = [8, 48, 12, 31, 23, 10];

svg = d3.select('body').append('svg').attr({
        width: 605,
        height: 400,
}).style({
    border: '1px solid #DDD',
    margin: '30px'
});


svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append("rect")
    .attr({
        x: function (d, idx) {
            return idx * 101;
        },
        y: function (d) {
            return 400 - (d * 5)
        },
        width: 100,
        height: function (d) {
            return d * 5;
        },
        fill: 'orange'
    });

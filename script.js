
function datapoint(fecha, apoyos, incremento)
{
    this.fecha = fecha;
    this.apoyos = apoyos;
    this.incremento = incremento;
}

var datapoints = [
    new datapoint("2017/11/03", 17823, 1248),
    new datapoint("2017/11/04", 19350, 1527),
    new datapoint("2017/11/05", 20876, 1526),
    new datapoint("2017/11/06", 22340, 1464),
    new datapoint("2017/11/07", 23692, 1352),
    new datapoint("2017/11/08", 24892, 1200),
    new datapoint("2017/11/09", 26506, 1614),
    new datapoint("2017/11/10", 28411, 1905),
    new datapoint("2017/11/11", 30427, 2016),
    new datapoint("2017/11/12", 32801, 2374),
    new datapoint("2017/11/13", 34880, 2079),
    new datapoint("2017/11/14", 36959, 2079),
    new datapoint("2017/11/15", 38260, 1301),
    new datapoint("2017/11/16", 40065, 1805),
    new datapoint("2017/11/17", 41971, 1906),
    new datapoint("2017/11/18", 43736, 1765),
    new datapoint("2017/11/19", 45818, 2082),
    new datapoint("2017/11/20", 48185, 2367),
    new datapoint("2017/11/21", 49832, 1647),
    new datapoint("2017/11/22", 51336, 1504),
    new datapoint("2017/11/23", 53118, 1782),
    new datapoint("2017/11/24", 54963, 1845),
    new datapoint("2017/11/25", 56437, 1474),
    new datapoint("2017/11/26", 58615, 2178),
    new datapoint("2017/11/27", 61456.5, 2841.5),
    new datapoint("2017/11/28", 64298, 2841.5),
    new datapoint("2017/11/29", 66822, 2524),
    new datapoint("2017/11/30", 69925, 3103),
    new datapoint("2017/12/01", 72243, 2318),
    new datapoint("2017/12/02", 74256, 2013),
    new datapoint("2017/12/03", 78003, 3747),
    new datapoint("2017/12/04", 80883, 2880),
    new datapoint("2017/12/05", 82863, 1980),
    new datapoint("2017/12/06", 84540, 1677),
    new datapoint("2017/12/07", 86451, 1911),
    new datapoint("2017/12/08", 88270, 1819),
    new datapoint("2017/12/09", 89736, 1466),
    new datapoint("2017/12/10", 91375, 1639),
    new datapoint("2017/12/11", 93552, 2177),
    new datapoint("2017/12/12", 95138, 1586),
    new datapoint("2017/12/13", 96846, 1708),
    new datapoint("2017/12/14", 98285, 1439),
]

var totalesCtx = document.getElementById("totalesChart");
var totalesChart = new Chart(totalesCtx, {
    type: 'bar',
    data: {
	labels: datapoints.map(function (elem) { return elem.fecha; }),
	// colors: http://www.color-hex.com/color-palette/51394
        datasets: [
	    {
		label: 'Apoyos totales',
		data: datapoints.map(function (elem) { return elem.apoyos; }),
		backgroundColor: 'rgba(255,225,94, 0.9)',
		yAxisID: 'totales'
            },
	]
    },
    options: {
        scales: {
            yAxes: [{
		id: 'totales',
                type: 'linear',
		ticks: {
		    beginAtZero: true
		},
                position: 'left'
            }]
        }
    }
});

var diariosCtx = document.getElementById("diariosChart");
var diariosChart = new Chart(diariosCtx, {
    type: 'bar',
    data: {
	labels: datapoints.map(function (elem) { return elem.fecha; }),
	// colors: http://www.color-hex.com/color-palette/51394
        datasets: [
	    {
		label: 'Apoyos diarios',
		data: datapoints.map(function (elem) { return elem.incremento; }),
		backgroundColor: 'rgba(45,81,154, 0.9)',
		yAxisID: 'diarios'
	    }
	]
    },
    options: {
        scales: {
            yAxes: [{
                id: 'diarios',
                type: 'linear',
		ticks: {
		    beginAtZero: true
		},
                position: 'left'
            }]
        }
    }
});
/*
var data = [
    ["", "Ford", "Tesla", "Toyota", "Honda"],
    ["2017", 10, 11, 12, 13],
    ["2018", 20, 11, 14, 13],
    ["2019", 30, 15, 12, 13]
];

var container = document.getElementById('data');
var hot = new Handsontable(container, {
    data: data,
    readOnly: true,
    rowHeaders: true,
    colHeaders: true
});
*/

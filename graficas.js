// calculate daily difference
for (var i = 1; i < apoyos_data.length; i++) {
    apoyos_data[i].incremento = apoyos_data[i].apoyos - apoyos_data[i-1].apoyos;
}

document.getElementById("ultimaFecha").innerHTML = apoyos_data[apoyos_data.length - 1].fecha;
document.getElementById("apoyosTotales").innerHTML = apoyos_data[apoyos_data.length - 1].apoyos.toLocaleString();

var totalesCtx = document.getElementById("totalesChart");
var totalesChart = new Chart(totalesCtx, {
    type: 'bar',
    data: {
	labels: apoyos_data.map(function (elem) { return elem.fecha; }),
	// colors: http://www.color-hex.com/color-palette/51394
        datasets: [
	    {
		label: 'Apoyos totales',
		data: apoyos_data.map(function (elem) { return elem.apoyos; }),
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
	labels: apoyos_data.map(function (elem) { return elem.fecha; }),
	// colors: http://www.color-hex.com/color-palette/51394
        datasets: [
	    {
		label: 'Apoyos diarios',
		data: apoyos_data.map(function (elem) { return elem.incremento; }),
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

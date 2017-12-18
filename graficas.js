// calculate daily difference (skip first)
for (var i = 1; i < apoyos_data.length; i++) {
    apoyos_data[i].incremento = apoyos_data[i].apoyos - apoyos_data[i-1].apoyos;
}

// calculate last week average
var averageLastWeek = 0;
for (var i = apoyos_data.length - 8; i < apoyos_data.length; i++) {
    averageLastWeek += apoyos_data[i].incremento;
}
averageLastWeek /= 7.0;

// calculate days left
var oneDay = 24*60*60*1000;
var lastDate = new Date(apoyos_data[apoyos_data.length - 1].fecha);
var limitDate = new Date("2018-2-19");
var daysLeft = Math.round(Math.abs((lastDate.getTime() - limitDate.getTime())/(oneDay)));

// calculate required daily rate
var required = 866593;
var weHave = apoyos_data[apoyos_data.length - 1].apoyos;
var requiredDaily = (required - weHave) / daysLeft;

document.getElementById("ultimaFecha").innerHTML = apoyos_data[apoyos_data.length - 1].fecha;
document.getElementById("apoyosTotales").innerHTML = apoyos_data[apoyos_data.length - 1].apoyos.toLocaleString();
document.getElementById("promedioUltimaSemana").innerHTML = Math.round(averageLastWeek).toLocaleString();
document.getElementById("diasRestantes").innerHTML = daysLeft;
document.getElementById("requiredDaily").innerHTML = Math.round(requiredDaily).toLocaleString();

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

var auxiliaresCtx = document.getElementById("auxiliaresChart");
var auxiliaresChart = new Chart(auxiliaresCtx, {
    type: 'bar',
    data: {
	labels: apoyos_data.map(function (elem) { return elem.fecha; }),
	// colors: http://www.color-hex.com/color-palette/51394
        datasets: [
	    {
		label: 'Auxiliares Registrados',
		data: apoyos_data.map(function (elem) { return elem.auxiliares; }),
		backgroundColor: 'rgba(45,81,154, 0.9)',
		yAxisID: 'auxiliares'
	    },
	    {
		label: 'Auxiliares Activos',
		data: apoyos_data.map(function (elem) { return elem.auxiliares_activos; }),
		backgroundColor: 'rgba(255,225,94, 0.9)',
		yAxisID: 'auxiliares'
	    }
	]
    },
    options: {
        scales: {
            yAxes: [
		{
                    id: 'auxiliares',
                    type: 'linear',
		    ticks: {
			beginAtZero: true
		    },
                    position: 'left'
		}
            ]
        }
    }
});

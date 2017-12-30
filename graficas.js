// calculate daily difference
for (var i = 0; i < apoyos_data.length; i++) {
    if (i > 0) { // skip first
	apoyos_data[i].incremento = apoyos_data[i].apoyos - apoyos_data[i-1].apoyos;
	if (apoyos_data[i-1].apoyos_validos != 0) // skip first available value (it is veri big)
	    apoyos_data[i].incremento_validos = apoyos_data[i].apoyos_validos - apoyos_data[i-1].apoyos_validos;
	apoyos_data[i].auxiliares_incremento = apoyos_data[i].auxiliares - apoyos_data[i-1].auxiliares;
	apoyos_data[i].auxiliares_activos_incremento = apoyos_data[i].auxiliares_activos - apoyos_data[i-1].auxiliares_activos;
    }
    apoyos_data[i].auxiliares_activos_porcentaje = (apoyos_data[i].auxiliares_activos / apoyos_data[i].auxiliares) * 100;
    apoyos_data[i].porcentaje_validos = (apoyos_data[i].apoyos_validos / apoyos_data[i].apoyos) * 100;
    apoyos_data[i].apoyos_por_auxiliar = apoyos_data[i].apoyos / apoyos_data[i].auxiliares_activos;
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
		label: 'Apoyos Totales',
		data: apoyos_data.map(function (elem) { return elem.apoyos; }),
		backgroundColor: 'rgba(45,81,154, 0.9)',
		yAxisID: 'totales'
            },
	    {
		label: 'Apoyos Válidos',
		data: apoyos_data.map(function (elem) { return elem.apoyos_validos; }),
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
		label: 'Apoyos Diarios',
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

var validosCtx = document.getElementById("validosChart");
var validosChart = new Chart(validosCtx, {
    type: 'bar',
    data: {
	labels: apoyos_data.map(function (elem) { return elem.fecha; }),
	// colors: http://www.color-hex.com/color-palette/51394
        datasets: [
	    {
		label: 'Porcentaje de Apoyos Válidos',
		data: apoyos_data.map(function (elem) { return elem.porcentaje_validos; }),
		backgroundColor: 'rgba(45,81,154, 0.9)',
		yAxisID: 'validos'
            },
	]
    },
    options: {
        scales: {
            yAxes: [{
		id: 'validos',
                type: 'linear',
		ticks: {
		    beginAtZero: true
		},
                position: 'left'
            }]
        }
    }
});

var diariosValidosCtx = document.getElementById("diariosValidosChart");
var diariosValidosChart = new Chart(diariosValidosCtx, {
    type: 'bar',
    data: {
	labels: apoyos_data.map(function (elem) { return elem.fecha; }),
	// colors: http://www.color-hex.com/color-palette/51394
        datasets: [
	    {
		label: 'Apoyos Válidos Diarios',
		data: apoyos_data.map(function (elem) { return elem.incremento_validos; }),
		backgroundColor: 'rgba(255,225,94, 0.9)',
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

var auxiliaresIncrementoCtx = document.getElementById("auxiliaresIncrementoChart");
var auxiliaresIncrementoChart = new Chart(auxiliaresIncrementoCtx, {
    type: 'bar',
    data: {
	labels: apoyos_data.map(function (elem) { return elem.fecha; }),
	// colors: http://www.color-hex.com/color-palette/51394
        datasets: [
	    {
		label: 'Nuevos Auxiliares Registrados por día',
		data: apoyos_data.map(function (elem) { return elem.auxiliares_incremento; }),
		backgroundColor: 'rgba(45,81,154, 0.9)',
		yAxisID: 'auxiliares'
	    },
	    {
		label: 'Nuevos Auxiliares Activos por díá',
		data: apoyos_data.map(function (elem) { return elem.auxiliares_activos_incremento; }),
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

var auxiliaresActivosPorcentajeCtx = document.getElementById("auxiliaresActivosPorcentajeChart");
var auxiliaresActivosPorcentajeChart = new Chart(auxiliaresActivosPorcentajeCtx, {
    type: 'bar',
    data: {
	labels: apoyos_data.map(function (elem) { return elem.fecha; }),
	// colors: http://www.color-hex.com/color-palette/51394
        datasets: [
	    {
		label: 'Porcentaje de Auxiliares Activos',
		data: apoyos_data.map(function (elem) { return elem.auxiliares_activos_porcentaje; }),
		backgroundColor: 'rgba(45,81,154, 0.9)',
		yAxisID: 'auxiliaresActivosPorcentaje'
	    }
	]
    },
    options: {
        scales: {
            yAxes: [{
                id: 'auxiliaresActivosPorcentaje',
                type: 'linear',
		ticks: {
		    beginAtZero: true
		},
                position: 'left'
            }]
        }
    }
});

var apoyosPorAuxiliarCtx = document.getElementById("apoyosPorAuxiliarChart");
var apoyosPorAuxiliarChart = new Chart(apoyosPorAuxiliarCtx, {
    type: 'bar',
    data: {
	labels: apoyos_data.map(function (elem) { return elem.fecha; }),
	// colors: http://www.color-hex.com/color-palette/51394
        datasets: [
	    {
		label: 'Promedio de Apoyos por Auxiliar Activo',
		data: apoyos_data.map(function (elem) { return elem.apoyos_por_auxiliar; }),
		backgroundColor: 'rgba(45,81,154, 0.9)',
		yAxisID: 'apoyosPorAuxiliar'
	    }
	]
    },
    options: {
        scales: {
            yAxes: [{
                id: 'apoyosPorAuxiliar',
                type: 'linear',
		ticks: {
		    beginAtZero: true
		},
                position: 'left'
            }]
        }
    }
});

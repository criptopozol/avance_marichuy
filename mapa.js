function state_data(nombre, apoyos, porcentaje)
{
    this.nombre = nombre;
    this.apoyos = apoyos;
    this.porcentaje = porcentaje;
}

var state_datas = [
    new state_data("Aguascalientes", 1733, 19.05),
    new state_data("Baja California", 1223, 4,64),
    new state_data("Baja California Sur", 393, 7.85),
    new state_data("Campeche", 210, 3,36),
    new state_data("Coahuila", 728, 3.49),
    new state_data("Colima", 1216, 23,49),
    new state_data("Chiapas", 9861, 28.86),
    new state_data("Chihuahua", 1175, 4.42),
    new state_data("Ciudad de México", 19398, 25.98),
    new state_data("Durango", 272, 2.18),
    new state_data("Guanajuato", 2079, 4.89),
    new state_data("Guerrero", 257, 1.05),
    new state_data("Hidalgo", 817, 3.97),
    new state_data("Jalisco", 11833, 20.50),
    new state_data("México", 7269, 6.34),
    new state_data("Michoacán", 1828, 5.48),
    new state_data("Morelos", 1597, 11.34),
    new state_data("Nayarit", 1182, 14.36),
    new state_data("Nuevo León", 1211, 3.20),
    new state_data("Oaxaca", 1315, 4.71),
    new state_data("Puebla", 1662, 3.82),
    new state_data("Querétaro", 2407, 15.79),
    new state_data("Quintana Roo", 416, 3.59),
    new state_data("San Luis Potosí", 1868, 9.73),
    new state_data("Sinaloa", 2505, 12.04),
    new state_data("Sonora", 403, 1.97),
    new state_data("Tabasco", 139, 0.84),
    new state_data("Tamaulipas", 352, 1.38),
    new state_data("Tlaxcala", 686, 7.67),
    new state_data("Veracruz", 2920, 5.18),
    new state_data("Yucatán", 818, 5.47),
    new state_data("Zacatecas", 4383, 38.63),
];

var i = 0;
for (state of statesData.features) {
    // sanity check
    if (state.properties["name"] == state_datas[i].nombre) {
	state.properties["nombre"] = state_datas[i].nombre;
	state.properties["apoyos"] = state_datas[i].apoyos;
	state.properties["porcentaje"] = state_datas[i].porcentaje;
    }
    i += 1;
}

var mapboxAccessToken = "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";
var map = L.map('mapid').setView([19.432608, -99.133209], 4);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
    id: 'mapbox.light',
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
	'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
	'Imagery © <a href="http://mapbox.com">Mapbox</a>'
}).addTo(map);

// control that shows state info on hover
var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML = '<h4>Apoyos por Estado</h4>' +
	(props ?
	 '<b>' + props.nombre + '</b><br />' +
	 props.apoyos + ' apoyos'+ '<br />' +
	 props.porcentaje + '%'
	 : 'Pon el mouse sobre un estado');
};

info.addTo(map);

function getColor(d) {
    return d >= 30 ? "#00441b":
	d > 27 ? "#006d2c":
	d > 24 ? "#238b45":
	d > 21 ? "#41ab5d":
	d > 18 ? "#74c476":
	d > 15 ? "#a1d99b":
	d > 12 ? "#c7e9c0":
	d > 9 ? "#e5f5e0":
	d > 6 ? "#f7fcf5":
	d > 3 ? "#fffcf5":
	"#ffffff";
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.porcentaje),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
	weight: 5,
	color: '#666',
	dashArray: '',
	fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
	layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

var geojson;

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
	mouseover: highlightFeature,
	mouseout: resetHighlight,
	click: zoomToFeature
    });
}

geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

map.attributionControl.addAttribution('Con datos del INE <a href="http://www.ine.mx/reportes-apoyo-ciudadano/">Reportes de Apoyo Ciudadano</a>');

var legend = L.control({position: 'bottomleft'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
	grades = [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30],
	labels = [],
	from, to;

    for (var i = 0; i < grades.length; i++) {
	from = grades[i];
	to = grades[i + 1];

	labels.push(
	    '<i style="background:' + getColor(from + 1) + '"></i> ' +
		from + (to ? '&ndash;' + to : '+') + '%');
    }

    div.innerHTML = labels.join('<br>');
    return div;
};

legend.addTo(map);

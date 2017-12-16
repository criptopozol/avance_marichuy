var mapboxAccessToken = "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";
var map = L.map('mapid').setView([19.432608, -99.133209], 4);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
    id: 'mapbox.light',
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
	'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
	'Imagery © <a href="http://mapbox.com">Mapbox</a>'
}).addTo(map);

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
    if (state.properties["name"] == state_datas[i].nombre)
	state.properties["apoyos"] = state_datas[i].porcentaje;
    i += 1;
}

function getColor(d) {
    return d >= 10 ? "#00441b":
	d > 9 ? "#006d2c":
	d > 8 ? "#238b45":
	d > 7 ? "#41ab5d":
	d > 6 ? "#74c476":
	d > 5 ? "#a1d99b":
	d > 4 ? "#c7e9c0":
	d > 3 ? "#e5f5e0":
	d > 2 ? "#f7fcf5":
	d > 1 ? "#fffcf5":
	"#ffffff";
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.apoyos),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

L.geoJson(statesData, {style: style}).addTo(map);

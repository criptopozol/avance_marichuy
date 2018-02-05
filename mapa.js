// map geometry data with dispersion data
var i = 0;
for (state of statesData.features) {
    // sanity check
    if (state.properties["name"] == dispersion[i].nombre) {
	state.properties["nombre"] = dispersion[i].nombre;
	state.properties["apoyos"] = dispersion[i].apoyos;
	state.properties["porcentaje"] = dispersion[i].porcentaje;
    }
    i += 1;
}

var map = L.map('mapid').setView([23.6260333, -102.5375005], 5);

// create the tile layer with correct attribution
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osm = new L.TileLayer(osmUrl);
map.addLayer(osm);
map.attributionControl.addAttribution('Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors');
map.attributionControl.addAttribution('Datos del INE <a href="http://www.ine.mx/reportes-apoyo-ciudadano/">Reportes de Apoyo Ciudadano</a>');
map.attributionControl.addAttribution('GeoJSON de <a href="https://gist.github.com/ponentesincausa/46d1d9a94ca04a56f93d#file-mexico-json">ponentesincausa</a>');

// control that shows state info on hover
var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML = '<h4>Apoyos por Estado al día ' + dispersion_fecha + '</h4>' +
	(props ?
	 '<b>' + props.nombre + '</b><br />' +
	 props.apoyos + ' apoyos'+ '<br />' +
	 props.porcentaje + '%'
	 : 'Pon el mouse sobre un estado');
};

info.addTo(map);

function getColor(d) {
    return d >= 70 ? "#00441b":
	d > 60 ? "#006d2c":
	d > 50 ? "#238b45":
	d > 40 ? "#41ab5d":
	d > 30 ? "#74c476":
	d > 20 ? "#a1d99b":
	d > 15 ? "#c7e9c0":
	d > 10 ? "#e5f5e0":
	d > 5 ? "#f7fcf5":
	d > 2 ? "#fffcf5":
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

var legend = L.control({position: 'bottomleft'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
	grades = [0, 2, 5, 10, 15, 20, 30, 40, 50, 60, 70],
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

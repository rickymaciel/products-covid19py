var map = null;
var action = null;

/**
 * Method localization by html5.
 * @method localization
 * @param p_action
 * @returns void
 */
function localization(p_action){
	action = p_action;
	
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(getCoordinates, errors, {
			enableHighAccuracy: true,
			timeout: 2000,
			maximumAge: 0
		});
    }
    else
    {
    	defaultPosition();
    }
}

/**
 * Method that obtains the current coordinates by means of geolocation.
 * @method getCoordinates
 * @param p_position
 * @returns void
 */
function getCoordinates (p_position)
{
    var coordinates = new Array();
    coordinates['lng']  = p_position.coords.longitude;
	coordinates['lat'] = p_position.coords.latitude;
	
	var zoom = 17;

    load_map(coordinates, zoom);
}

/**
 * Method errors, be the error code that comes out, will default to load coordinates (latitude and longitude).
 * @method errors
 * @param error
 * @returns void
 */
function errors (error)
{
	switch(error.code){
    	case error.PERMISSION_DENIED:
    		alert("User denied the request for Geolocation.");
    		break;
    	case error.POSITION_UNAVAILABLE:
    		alert("Location information is unavailable.");
    		break;
    	case error.TIMEOUT:
    		alert("The request to get user location timed out.");
    		break;
    	case error.UNKNOWN_ERROR:
    		alert("An unknown error occurred.");
    		break;
    }
    defaultPosition();
}	

/**
 * Method that positions default.
 * @method defaultPosition
 * @returns void
 */ 
function defaultPosition ()
{
    var lng = DEFAULT_LNG;
	var lat = DEFAULT_LAT;
	var coordinates = new Array();
	var zoom = 6;
   
    coordinates['lng']  = lng;
    coordinates['lat'] = lat;
    
	load_map(coordinates, zoom);
}

/**
 * Method that loads the map.
 * @method load_map
 * @param p_coordinates
 * @param p_zoom
 * @returns void
 */
function load_map (p_coordinates, p_zoom)
{
    switch (action)
    {
	    case 'marker':
			map = new Map(p_coordinates, p_zoom);
			map.marker_point(p_zoom);
            break;
        case 'list':
        case 'default':
            map = new Map(p_coordinates, p_zoom);
            map.get_vendors();
            break;
	}
}

// //
// function filtrar(){
// 	v_mapa.filtrar_eventos();
// }

// //
// function direccion_buscador() {
//     var v_entrada = document.getElementById("direccion");

//     $.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + v_entrada.value, function(p_data) {
//         var v_array_items = [];

//         $.each(p_data, function(key, val) {
//             bb = val.boundingbox;
//             console.log('val: ', val);
            
//             v_array_items.push("<li><a href='#' onclick='elegirDireccion(" + bb[0] + ", " + bb[2] + ", " + bb[1] + ", " + bb[3] + ", \"" + val.osm_type + "\");return false;'>" + val.display_name + '</a></li>');
//         });

//         $('#resultado').empty();
//         if (v_array_items.length != 0) {
//             $('<p>', { html: "Resultados de la b&uacute;queda:" }).appendTo('#resultado');
//             $('<ul/>', {
//                 'class': 'my-new-list',
//                 html: v_array_items.join('')
//             }).appendTo('#resultado');
//         }else{
//              $('<p>', { html: "Ningun resultado encontrado." }).appendTo('#resultado');
//         }
//     });
// }

// //
// function elegirDireccion(p_lat1, p_lng1, p_lat2, p_lng2, p_tipo_osm) {
//     v_mapa.marcar(p_lat1, p_lng1, p_lat2, p_lng2, p_tipo_osm);
// }
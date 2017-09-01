// Put your zillow.com API key here
//NAME : RAJARAMAN GOVINDASAMY
//UTA ID : 1001165700
var username = "rajaramang";
var request = new XMLHttpRequest();
var map = null;
var markers = [];

//initMap() which initiates map to a location
function initMap() {
	var Latu = {lat: 32.7326979,lng: -97.12};
	map = new google.maps.Map(document.getElementById('map'), {
          center:{lat: 32.7326979,lng: -97.12},
		  zoom: 17});
	google.maps.event.addListener(map, 'click', function(event) {
    reversegeocode(event.latLng)
	});
}

function reversegeocode(latlng) {
	removeMarkers();
	var geocoder = new google.maps.Geocoder;
	geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[0]) {
      var marker = new google.maps.Marker({
                position: latlng,
                map: map
	});
	markers.push(marker);
	var infowindow = new google.maps.InfoWindow({
		content:'Latitude: ' + latlng.lat() +
    '<br>Longitude: ' + latlng.lng()
	});
	infowindow.open(map, marker);
	infowindow.setContent(results[0].formatted_address);
	var value = results[0].formatted_address ;
	document.getElementById("displayarea").innerHTML += value;
	sendRequest(latlng);
	}
	else
	{
		window.alert('No results found');
	}}
	else
	{
		window.alert('Geocoder failed due to: ' + status);
	}
	});
	}
	function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }
	  function removeMarkers() {
        setMapOnAll(null);
      }
	  function deleteMarkers() {
		clearMarkers();
        markers = [];


		}
	function cleardata(){
				document.getElementById("displayarea").value = "";
	}
	google.maps.event.addDomListener(window,'load',initMap);

//Initialize a mouse click event on map which then calls reversegeocode function
// Reserse Geocoding
function sendRequest(latlng) {

	var lat = latlng.lat();
	var lng = latlng.lng();
	var url= "http://api.geonames.org/findNearByWeatherXML?lat="+lat+"&lng="+lng+"&username="+username;
	var uri = encodeURI(url);
	request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      var data = request.responseXML;
	  displayResult(data);
	  }
  };
  request.open("GET", url, true);
  request.send();
}// end of geocodeLatLng()


function displayResult () {
    if (request.readyState == 4) {
        var xml = request.responseXML.documentElement;
        var temperature = xml.getElementsByTagName("temperature")[0].childNodes[0].nodeValue;
				var windspeed = xml.getElementsByTagName("windSpeed")[0].childNodes[0].nodeValue;
	document.getElementById("displayarea").innerHTML += "   |   Weather Details:  Temp: "+temperature + "   WindSpeed: "+windspeed+"\n";

    }
}

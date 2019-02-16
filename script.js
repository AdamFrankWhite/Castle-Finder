

// Map Function
var button = document.querySelector('button');

button.onclick = (function () {
	getPostcode()

function getPostcode() {
	postcode = document.getElementById('postcode').value;
	pcode = "https://api.postcodes.io/postcodes/" + postcode

	let request = new XMLHttpRequest();
	request.open('GET', pcode)
	request.onload = function () {
		var results = JSON.parse(request.responseText)
		lat = results.result.latitude;
		lng = results.result.longitude;
		console.log(lat, lng)
	}
	
	request.send();
}		
})



function initMap() {
	num1 = 53.3933;
	num2  =-2.1266;
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: num1, lng: num2},
		zoom: 7,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
		},
		styles: [
			{stylers: [
				{hue:"#00ff6f"},
				{saturation: -50}
			]}
		]
		
	})
	
	
	
	
	var image = 'images/icon.png';
	for (let i=0; i<castles.length; i+=1) {
		var castle = castles[i]
		var castleMarker = new google.maps.Marker({
		position: {lat: castle.pos[0], lng: castle.pos[1]},
		map: map,
		icon: image
	  });
	}
	
}


// append to dom card for each shelter within x 5miles, chosen from drop dwon menubar
// need to add all shelters to list - 

// or change or to something else useful, like local wildlife spots, nature things, see tourist websites something that isn't on googlemaps easily


// have media query at medium size to place map on left, with info box on right?
  

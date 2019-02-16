

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
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 53.3933, lng: -2.1266},
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
	
		//create marker for each castle
	for (let i=0; i<castles.length; i+=1) {
		var castle = castles[i]
		marker = new google.maps.Marker({
		position: {lat: castle.pos[0], lng: castle.pos[1]},
		map: map,
		icon: image
		
	  });
		// create html for marker info
		var contentString = `<div><h3 class="heading">${castle.name}</h3>` +
	`<h4>${castle.county}</h4>` + 
	`<img src='images/thumbs/${castle.img}'>` +
	`<h4 class="sub">Built: ${castle.built}</h4></div>`
		// create info window
		var infowindow = new google.maps.InfoWindow({
			content: contentString
	})
		
		marker.addListener('click', function () {
			infowindow.open(map, marker)
			console.log("hello")
	  });
	}
	
	
	
}


// append to dom card for each shelter within x 5miles, chosen from drop dwon menubar
// need to add all shelters to list - 

// or change or to something else useful, like local wildlife spots, nature things, see tourist websites something that isn't on googlemaps easily


// have media query at medium size to place map on left, with info box on right?
  



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
		let castle = castles[i]
		let marker = new google.maps.Marker({   // let is the magic word here - don't understand it fully, but because it only had block scope, the event listener below works for each iteration, and doesn't just take the final i value
		position: {lat: castle.pos[0], lng: castle.pos[1]},
		map: map,
		icon: image
		
	  });
		// create html for marker info
		let contentString = `<div><h3 class="heading">${castle.name}</h3>` +
	`<h4>${castle.county}</h4>` + 
	`<img src='images/thumbs/${castle.img}'>` +
	`<h4 class="sub">Built: ${castle.built}</h4>` +
	`<h4 class="sub">Status: ${castle.status}</h4>` +
	`<h4 class="sub">Postcode: ${castle.postcode}</h4></div>`
		// create info window - - use of let VITAL, see above
		let infowindow = new google.maps.InfoWindow({
			content: contentString
	})
		console.log(marker)
		marker.addListener('click', function () {
			infowindow.close()
			infowindow.open(map, marker)
			console.log("hello")
	  });
	}
	
	
	
}


// append to dom card for each shelter within x 5miles, chosen from drop dwon menubar
// need to add all shelters to list - 

// or change or to something else useful, like local wildlife spots, nature things, see tourist websites something that isn't on googlemaps easily


// have media query at medium size to place map on left, with info box on right?

// when entered postcode, center map and display closest five castle on the side/bottom?
  
// this type of app has real marketable value - think seeds or plant search, where you can choose your type, and find all nearby stockists

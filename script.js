

// Map Function
var button = document.querySelector('button');
var container = document.querySelector('.container')
var errorMessage = document.getElementById('error')

button.onclick = function () {
	getPostcode()
}


function getPostcode() {
	postcode = document.getElementById('postcode').value;
	pcode = "https://api.postcodes.io/postcodes/" + postcode

	if (postcode === "") {
		$('#error').slideToggle();
		errorMessage.style.visibility = 'visible';
		$('#error').delay(3000).slideUp();
	} else {
	
	

	let request = new XMLHttpRequest();
	request.open('GET', pcode)
	request.onload = function () {
		var results = JSON.parse(request.responseText)
		if (request.status === 200) {
			latitude = results.result.latitude;
			longitude = results.result.longitude;	
			updateMap(latitude,longitude) //updates map position to postcode
			errorMessage.style.visibility = 'hidden';
		} else if (request.status === 404){
			
			errorMessage.style.visibility = 'visible';
			errorMessage.textContent = `${postcode} is not a valid UK postcode. Please try again.`
			
			
		} else {
				
			errorMessage.style.visibility = 'visible';
			errorMessage.textContent = 'Error. Please try again.'
		
		}
	}
	
	request.send();
	}
	
}		




function initMap(latitude=53.3933, longitude=-2.1266, zoomValue=6) { // add default coordinate values, or pass in updated coordinates
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: latitude, lng: longitude},
		zoom: zoomValue,
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
		let contentString = 
	
	`<div><h3 class="heading"><a href="${castle.website}" target="_blank">${castle.name}</a></h3>` +
	`<h4><i>${castle.county}</i></h4>` + 
	`<img src='images/thumbs/${castle.img}'>` +
	`<h4 class="sub">Built: <p>${castle.built}</p></h4>` +
	`<h4 class="sub">Status: <p>${castle.status}</p></h4>` +
	`<h4 class="sub">Postcode: <p>${castle.postcode}</p></h4></div>` +
	`<span class="moreInfo">more info &#62; &#62;</span>`
		// create info window - - use of let VITAL, see above
		let infowindow = new google.maps.InfoWindow({
			content: contentString
	})
		
		marker.addListener('click', function () {
			infowindow.close()
			infowindow.open(map, marker)
			console.log("hello")
	  });
	  
		
	}
	
	
	
}

function updateMap(longitude, latitude) {
	initMap(longitude, latitude, 9) // updates zoom
}


// append to dom card for each shelter within x 5miles, chosen from drop dwon menubar
// need to add all shelters to list - 

// or change or to something else useful, like local wildlife spots, nature things, see tourist websites something that isn't on googlemaps easily

// add postcode validation, add if statement to whether castle has website

// have media query at medium size to place map on left, with info box on right?

// have more>> button (next to county?), that appends div to the right of window, with short description

// when entered postcode, center map and display closest five castle on the side/bottom?
  
// this type of app has real marketable value - think seeds or plant search, where you can choose your type, and find all nearby stockists
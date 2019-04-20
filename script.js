// === Selectors ====

var button = document.querySelector('button');
var container = document.querySelector('.container');
var errorMessage = document.getElementById('error');
var searchField = document.getElementById('postcode');

// === Event Listeners ===

button.onclick = function () {
	getPostcode()
}

// === Functions ====

function hideError() {
	errorMessage.style.visibility = 'hidden';
}

function showError() {
	errorMessage.style.visibility = 'visible';
}

function createMarkerContent(castle) {
	let contentString = 
	    `<div class="marker-window"><h3 class="heading"><a href="${castle.website}" target="_blank">${castle.name}</a></h3>` +
	// div class for media queries
        `<h4 class="sub_county"><i>${castle.county}</i></h4>` + 
        `<img src='images/thumbs/${castle.img}'>` +
        `<h4 class="sub_built">Built: <p>${castle.built}</p></h4>` +
        `<h4 class="sub_status">Status: <p>${castle.status}</p></h4>` +
        `<h4 class="sub_post">Postcode: <p>${castle.postcode}</p></h4>` +
        `<h4 class="more-info"><a target="_blank" href="${castle.website}">Visit Website</a></h4>
			</div>` 
  return contentString;
}

function getPostcode() {
	var postcode = document.getElementById('postcode').value;
	var pcode = "https://api.postcodes.io/postcodes/" + postcode
	
	//Validate input
	if (postcode === "") {
		showError();
		errorMessage.textContent = "Please enter a valid UK postcode";
	} else {
		// AJAX request
		
		let request = new XMLHttpRequest();
		request.open('GET', pcode)
		request.onload = function () {
			var results = JSON.parse(request.responseText);
			
			//Success
			if (request.status === 200) {
				var latitude = results.result.latitude;
				var longitude = results.result.longitude;	
				updateMap(latitude,longitude) //updates map position to postcode
				hideError();
				
			//Invalid postcode	
			} else if (request.status === 404){
				showError();
				errorMessage.textContent = `${postcode} is not a valid UK postcode. Please try again.`;
				
			//Other errors
			} else {
				showError();
				errorMessage.textContent = 'Error. Please try again.';
			}
		} // onload end
		
		request.send();
		}
}		

function initMap(latitude=53.3933, longitude=-2.1266, zoomValue=6) { // default values for initial load
	
	// === Map Object ===
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
	
	// === Markers ===
	
	//Icon
	var image = {
		url: 'images/icon.png',
		size: new google.maps.Size(70, 70)
	}
	
	//Create marker and infoWindow for each castle
	for (var i=0; i<castles.length; i+=1) {
		//Marker
		let castle = castles[i];    
		let marker = new google.maps.Marker({  
			position: {lat: castle.pos[0], lng: castle.pos[1]},
			map: map,
			icon: image,
			content: createMarkerContent(castle) 
	  });
		
    //infoWindow - - use of var VITAL here, to ensure only one infowindow open at a time    
		infowindow = new google.maps.InfoWindow({
			content: createMarkerContent(castle) 
	})
		//Marker click event
    google.maps.event.addListener(marker, 'click', function(){
      infowindow.setContent(this.content); 
      infowindow.open(map,this);})		
	}
}

function updateMap(longitude, latitude) {
	initMap(longitude, latitude, 9) // updates zoom
}



// Type ahead

function findMatches(termToMatch, castles) {
	return castles.filter(castle => {
		const regex = new RegExp(termToMatch, 'gi')
		return castle.name.match(regex) || castle.county.match(regex) || castle.postcode.match(regex)
		})
}

function clearSearch(){
	suggestions.innerHTML = ""; 
}

function updateSearchValue(castle) {
	postcode.value = castle;

}

// let marker = new google.maps.Marker({  
		// position: {lat: castle.pos[0], lng: castle.pos[1]},
		// map: map,
		// icon: image,
		// content: createMarkerContent(castle) 
	// }) 
  // infowindow.open(map,marker);

function displayMatches() {
	const matchesArray = findMatches(this.value, castles);
	const html = matchesArray.map(castle => {
		// let castleID = castle.name.toLowerCase().slice(0,4);
		let latitude = castle.pos[0]
		let longitude = castle.pos[1]
		return `
		<li>
	<span onclick="updateMap(${latitude}, ${longitude}); updateSearchValue('${castle.name}'); clearSearch();">${castle.name}, ${castle.county}, ${castle.postcode}</span>
		</li>
	`}).join(""); // .join vital to avoid comma bug - happens since using innerHTML to assign an array - this way the mapped output is changed to string before inserting as HTML
	suggestions.innerHTML = html; // add click event to focus on castle
}

const searchInput = document.querySelector('#postcode');
const suggestions = document.querySelector('.suggestions');
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);


// or change or to something else useful, like local wildlife spots, nature things, see tourist websites something that isn't on googlemaps easily

// have more>> button (next to county?), that appends div to the right of window, with short description

// when entered postcode, center map and display closest five castle on the side/bottom?
  
// this type of app has real marketable value - think seeds or plant search, where you can choose your type, and find all nearby stockists
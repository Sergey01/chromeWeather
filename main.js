//write something here
// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}

const API_KEY = '0c186a8c759453e0fd31c9939838eb69';

const sendZipCode = function () {
	const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	let lat;
	let lon;

	let zip = document.getElementById('userInput').value;
	if (zip.length !== 5) return;
	// hit up the geocoding API to convert the zip code into a lat/long pair. Eventually, we'd want to
	// save this to a storage object with the zip code being the key and a lat, long array being the value.
	// Anyway, once we'll have the lat long pair we'll hit up the one call api
	
	fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&appid=${API_KEY}`)
	.then(function(response) {
		if (response.status !== 200) {
			document.getElementById('userInput').value = 'INVALID';
				return;
		}
		return response.json()
	})
	.then(function(data) {
		({lat, lon} = data); // object destructuring. es6 ftw
	}
	)
	.catch(function(err) {
		console.log("Error when calling geocode API: " +err)
	})

	/*
	fetch(
		`https://api.openweathermap.org/data/2.5/weather?zip=${zip},US&units=imperial&appid=${API_KEY}`
	)
		.then(function (response) {
			// check response status and if it's anything but 200, blame the user for entering
			// an invalid zip code.
			if (response.status !== 200) {
				document.getElementById('userInput').value = 'INVALID';
				return;
			}
			console.log(response.status);
			console.log(response.statusText);
			return response.json();
		})
		.then(function (data) {
			let conditions = data.weather[0].main;
			let temp = data.main.temp;
			document.getElementById('temperature').innerText = 'Temperature: ' + temp + "F";
			document.getElementById('conditions').innerText =
				'Conditions: ' + conditions;
			document.getElementById('zipCode').innerText = 'Zip Code: ' + zip;
		})
		.catch((err) => console.log('Something is wrong: ', err)); // end of fetch
};
*/

document.getElementById("button").addEventListener('click', sendZipCode);
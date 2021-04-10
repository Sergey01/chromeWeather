// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}

/*
change zip to coor: http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}
Example of API response:
{
  "zip": "90210",
  "name": "Beverly Hills",
  "lat": 34.0901,
  "lon": -118.4065,
  "country": "US"
}
*/

//One Call API: https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

// https://api.openweathermap.org/data/2.5/onecall?lat=34&lon=-118&exclude=minutely,hourly,alerts&units=metric&appid=0c186a8c759453e0fd31c9939838eb69

// https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${API_KEY}`

const API_KEY = '0c186a8c759453e0fd31c9939838eb69';

const weekDayArray = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

const sendZipCode = function () {
	let zip = document.getElementById('userInput').value; // need to be changed
	if (zip.length !== 5) return;
	// do a fetch for geo thing to get lat and lon
	let lat;
	let lon;
	// hit up the geocoding API to convert the zip code into a lat/long pair. Eventually, we'd want to
	// save this to a storage object with the zip code being the key and a lat, long array being the value.
	// Anyway, once we'll have the lat long pair we'll hit up the one call api

	fetch(
		`http://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&appid=${API_KEY}`
	)
		.then(function (response) {
			if (response.status !== 200) {
				document.getElementById('userInput').value = 'INVALID';
				return;
			}
			return response.json();
		})
		.then(function (data) {
			lat = data.lat;
			lon = data.lon;
		})
		.catch(function (err) {
			console.log('Error when calling geocode API: ' + err);
		});
	//
	fetch(
		`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${API_KEY}`
	)
		.then(function (response) {
			// check response status and if it's anything but 200, blame the user for entering
			// an invalid zip code.
			if (response.status !== 200) {
				return;
			}
			console.log(response.status);
			console.log(response.statusText);
			return response.json();
		})
		.then(function (data) {
			let conditions = data.current.weather[0].description;
			let temp = data.current.temp;
			//the daily part returns a array with 8 objects, first one is the current day
			let dailyTemp = data.daily.slice(1);
			document.getElementById('temperature').innerText =
				'Current Temperature: ' + Math.floor(temp);
			document.getElementById('conditions').innerText =
				'Conditions: ' + conditions;
			document.getElementById('zipCode').innerText = 'Zip Code: ' + zip;
			//////
			const gridDiv = document.getElementsByClassName('grid')[0];
			//create div for each day, display weekday name, min and max temp, and conditions
			for (let i = 0; i < dailyTemp.length; i++) {
				const weekDay = document.createElement('div');
				// dt is unix, UTC format, needs to convert through let date = new Date(unix * 1000).getDay();
				let currentDay =
					weekDayArray[new Date(dailyTemp[i].dt * 1000).getDay() % 7];
				gridDiv.appendChild(weekDay);
				weekDay.innerHTML =
					currentDay +
					'<br />' +
					'Max: ' +
					Math.floor(dailyTemp[i].temp.max) +
					'<br />' +
					'min: ' +
					Math.floor(dailyTemp[i].temp.min) +
					'<br />' +
					dailyTemp[i].weather[0].description;
				weekDay.style.backgroundColor = '#444';
				weekDay.style.color = '#fff';
				weekDay.style.padding = '15%';
				weekDay.style.fontSize = '150%';
				weekDay.style.borderRadius = '5px';
			}
		})
		.catch((err) => console.log('Something is wrong: ', err)); // end of fetch
}; // end of sendZipCode

document.getElementById('button').addEventListener('click', sendZipCode);

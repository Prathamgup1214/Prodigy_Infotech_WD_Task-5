const apiKey = 'f37c1a34549ee5f169ae792e0ae8a049';

document.addEventListener('DOMContentLoaded', () => {
    const locationInput = document.getElementById('locationInput');
    const getWeatherButton = document.getElementById('getWeatherButton');
    const reset_Button = document.getElementById("reset_button");
    const unitSelector = document.getElementsByName('unitSelector');
    const weatherInfo = document.getElementById('weatherInfo');

    getWeatherButton.addEventListener('click', () => {
        const location = locationInput.value;

        // const unit=" ";
        for (i = 0; i < unitSelector.length; i++) {
            if (unitSelector[i].checked)
            unit = unitSelector[i].value;
        }
        
        fetchWeatherData(location, unit);
    });

    reset_Button.addEventListener("click", () => {
        locationInput.value = ""; 
        weatherInfo.innerHTML = ""; 
        for (i = 0; i < unitSelector.length; i++) {
            if (unitSelector[i].value=="imperial")
            unitSelector[i].checked=false
            else
            unitSelector[i].checked=true
        }
        unitSelector[i].checked=false;
    });
    async function fetchWeatherData(location, unit) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${apiKey}`;
        
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Weather data not found.');
                }
                return response.json();
            })
            .then(data => {
                const temperature = data.main.temp;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;
                const weatherDescription = data.weather[0].description;
                const location = locationInput.value;
                const d = new Date();
               

                const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                var current_date = d.getUTCFullYear()+"-"+(d.getUTCMonth()+1)+"-"+ d.getUTCDate();
	            var current_time = d.getHours()+":"+d.getMinutes()+":"+ d.getSeconds();
                var date_time =  weekday[d.getUTCDay()]+" "+current_date+" "+current_time;	

                const weatherHtml = `
                    <p id="CityName" >${location}</p>
                    
                    <p  style="font-family: 'mooli', sans-serif;">${date_time}</p>
                    <p class="details">Temperature: ${temperature} °${unit === 'metric' ? 'C' : 'F'}</p>
                    <p class="details">Humidity: ${humidity}%</p>
                    <p class="details">Wind Speed: ${windSpeed} m/s</p>
                    <p class="details">Description: ${weatherDescription}</p>
                    
                `;

                weatherInfo.innerHTML = weatherHtml;
            })
            .catch(error => {
                console.error(error);

                if (error instanceof TypeError && error.message === "Failed to fetch") {
                  alert('Failed to connect to the server. Please check your internet connection.');
                } else {
                  alert('City not found. Please check the spelling and try again.');
                }
                // weatherInfo.innerHTML = `<p>${error.message}</p>`;
            });
    }
});


const getCurrentLocationButton = document.getElementById('getCurrentLocation');
const unitSelector = document.getElementsByName('unitSelector');

getCurrentLocationButton.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
           
            for (i = 0; i < unitSelector.length; i++) {
                if (unitSelector[i].checked)
                unit = unitSelector[i].value;
            }
           
            fetchWeatherByCoords(latitude, longitude,unit);
        }, error => {
            weatherInfo.innerHTML = `<p>Geolocation error: ${error.message}</p>`;
        });
    } else {
        weatherInfo.innerHTML = '<p>Geolocation is not supported by your browser.</p>';
    }
});

function fetchWeatherByCoords(latitude, longitude,unit) {
    
  
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Weather data not found.');
            }
            return response.json();
        })
        .then(data => {
            // Display weather data as before
            const temperature = data.main.temp;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;
                const weatherDescription = data.weather[0].description;
                const location = locationInput.value;
                const d = new Date();
               

                const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                var current_date = d.getUTCFullYear()+"-"+(d.getUTCMonth()+1)+"-"+ d.getUTCDate();
	            var current_time = d.getHours()+":"+d.getMinutes()+":"+ d.getSeconds();
                var date_time =  weekday[d.getUTCDay()]+" "+current_date+" "+current_time;	

               
              
                

                const weatherHtml = `
                
                <p id="cur_loc" >Current Location</p>
                    
                <p  style="font-family: 'mooli', sans-serif;">${date_time}</p>
                <p class="details">Temperature: ${temperature} °${unit === 'metric' ? 'C' : 'F'}</p>
                <p class="details">Humidity: ${humidity}%</p>
                <p class="details">Wind Speed: ${windSpeed} m/s</p>
                <p class="details">Description: ${weatherDescription}</p>
                
                

                `;

                weatherInfo.innerHTML = weatherHtml;
        })
        .catch(error => {
            weatherInfo.innerHTML = `<p>${error.message}</p>`;
        });
}
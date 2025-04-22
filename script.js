async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const resultDiv = document.getElementById("weatherResult");
    const loadingMessage = "<p class='loading'>Loading...</p>";

    if (!city) {
        resultDiv.innerHTML = "<p class='error-message'>❗Please enter the city name.</p>";
        return;
    }

    const apiKey = "a252ceff11aa80a1d2a3deea91645e3d";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    resultDiv.innerHTML = loadingMessage;

    try {
        const response = await fetch(url);
        if(!response.ok) throw new Error("City not found");

        // To convert the json file to js
        const data = await response.json();
        // console.log(data);
    
        resultDiv.innerHTML = `
            <h2>${Math.round(data.main.temp)}°C</h2>
            <h3>${data.name}, ${data.sys.country}</h3>
            <p><strong>Weather:</strong> ${data.weather[0].main}</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
        `;
    }
    catch (error) {
        resultDiv.innerHTML = `<p class='error-message'>⚠️ ${error.message}</p>`;
    }
}
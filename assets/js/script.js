const apiKey = import.meta.secrets.VITE_apiKey;
const form = document.querySelector("form");
const input = document.querySelector("input");
const forecastContainer = document.querySelector(".forecast-container");
const home = document.querySelector(".home");
const homeBtn = document.querySelector(".home-btn");
const loader = document.querySelector(".loader");

loader.style.display = "none";

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const city = input.value;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  

    loader.style.display = "block";

    setTimeout(() => {

            fetch(url)
            .then(response => response.json())
            .then(data => {
                
                while (forecastContainer.firstChild) {
                    forecastContainer.removeChild(forecastContainer.firstChild);
                }
                home.style.display = "none";
                    
                loader.style.display = "none";
                
                let lastDate = null;
                for(let i = 0; i < data.list.length; i++){
    
                        const forecast = data.list[i];
                        const date = new Date(forecast.dt_txt);

                        if(lastDate != null){
                            if(lastDate.toLocaleDateString() === date.toLocaleDateString()){
                                continue;
                            }
                            lastDate = date;
                        }
                        else{
                            lastDate = date;
                        }

                        const iconUrl = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
                        const div = document.createElement("div");
                        div.classList.add("forecast");

                        const forecastIcon = document.createElement("div");
                        forecastIcon.classList.add("forecast-icon");

                        const img = document.createElement("img");
                        img.src = iconUrl;
                        img.alt = forecast.weather[0].description;
                        forecastIcon.appendChild(img);
                        div.appendChild(forecastIcon);

                        const forecastDate = document.createElement("div");
                        forecastDate.classList.add("forecast-date");
                        forecastDate.textContent = date.toLocaleDateString();
                        div.appendChild(forecastDate);

                        const forecastTemp = document.createElement("div");
                        forecastTemp.classList.add("forecast-temp");
                        forecastTemp.textContent = `${Math.round(forecast.main.temp - 273.15)}°C`;
                        div.appendChild(forecastTemp);

                        const forecastDescription = document.createElement("div");
                        forecastDescription.classList.add("forecast-description");
                        forecastDescription.textContent = forecast.weather[0].description;
                        div.appendChild(forecastDescription);

                        forecastContainer.appendChild(div);
                }
                
            })
            .catch(error => console.log(error));
        

      
    }, 1000);
});

homeBtn.addEventListener("click", () => {
    forecastContainer.textContent = "";
    home.style.display = "flex";
});


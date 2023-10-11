const apiKey = import.meta.env.VITE_apiKey;
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
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${{apiKey}}`;
  

    loader.style.display = "block";

    setTimeout(() => {


            fetch(url)
            .then(response => response.json())
            .then(data => {
                
                forecastContainer.innerHTML = "";
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
                        div.innerHTML = `
                                <div class="forecast-icon"><img src="${iconUrl}" alt="${forecast.weather[0].description}"></div>
                                <div class="forecast-date">${date.toLocaleDateString()}</div>
                                <div class="forecast-temp">${Math.round(forecast.main.temp - 273.15)}°C</div>
                                <div class="forecast-description">${forecast.weather[0].description}</div>
                            
                        `;
                        forecastContainer.appendChild(div);
                }
                
            })
            .catch(error => console.log(error));
        

      
    }, 1000);
});

homeBtn.addEventListener("click", () => {
    forecastContainer.innerHTML = "";
    home.style.display = "flex";
});


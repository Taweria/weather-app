const apiKey = import.meta.env.VITE_apiKey;
const accessKey = import.meta.env.VITE_accessKey;
const form = document.querySelector("form");
const input = document.querySelector("input");
const forecastContainer = document.querySelector(".forecast-container");
const home = document.querySelector(".home");
const homeBtn = document.querySelector(".home-btn");
const loader = document.querySelector(".loader");
const photo = document.querySelector(".photo");
const titleCity = document.querySelector(".title");

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
            // const ctx = document.getElementById("chart").getContext("2d");

            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    // graphs
                    // const temperatures = data.list.map(forecast => forecast.main.temp - 273.15);
                    // const dates = data.list.map(forecast => new Date(forecast.dt_txt).toLocaleDateString());
                    // Chart.defaults.color = "black"
                    // const chart = new Chart(ctx, {
                    //     type: "line",
                    //     data: {
                    //         labels: dates,
                    //         datasets: [
                    //             {
                    //                 label: "Temperature",
                    //                 data: temperatures,
                    //                 borderColor: "darkblue",
                    //                 backgroundColor: "darkblue",
                    //                 borderWidth: 1,
                    //             }
                    //         ]
                    //     },
                    //     options: {
                    //         scales: {
                    //             xAxes: [
                    //                 {
                                
                    //                     type: "time",
                    //                     time: {
                    //                         unit: "day",
                    //                     },
                    //                 }
                    //             ],
                    //             yAxes: [
                    //                 {
                    //                     ticks: {
                    //                         beginAtZero: true,
                    //                     }
                    //                 }
                    //             ]
                    //         }
                    //     }
                    // });
                
                while (forecastContainer.firstChild) {
                    forecastContainer.removeChild(forecastContainer.firstChild);
                }
                home.style.display = "none";
                    
                loader.style.display = "none";

                const title = document.createElement("h2");
                title.textContent = city;
                title.style.textTransform = "uppercase";
                titleCity.appendChild(title);
                
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
            .catch(error => console.log("error fetching api"));
        
            // photo fro the city with unsplash api
            // fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}&query=${city}&count=1`)
            //     .then(response => response.json())
            //     .then(data => {
            //         const img = document.createElement("img");
            //         img.src =  data[0].urls.regular;
            //         img.alt = city;
            //         photo.appendChild(img);
            //     })
            //     .catch(error => console.log("error fetching api"));


      
        })
    }, 1000);
});

//home button

homeBtn.addEventListener("click", () => {
    forecastContainer.textContent = "";
    home.style.display = "flex";
    // photo.textContent = "";
    titleCity.textContent = "";
});

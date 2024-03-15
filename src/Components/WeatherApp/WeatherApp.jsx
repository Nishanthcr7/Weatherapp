import React, { useState } from 'react'
import './WeatherApp.css'
import search_icon from "../Assets/search.png"
import clear_icon from "../Assets/clear.png"
import cloud_icon from "../Assets/cloud.png"
import drizzle_icon from "../Assets/drizzle.png"
import rain_icon from "../Assets/rain.png"
import snow_icon from "../Assets/snow.png"
import wind_icon from "../Assets/wind.png"
import humidity_icon from "../Assets/humidity.png"

export const WeatherApp = () => {
  
    const [Wicon,setWicon] = useState(cloud_icon);

    const  search = async () => {
        const cityInput = document.getElementsByClassName("cityinput")[0];
        const humidity = document.getElementsByClassName("humidity-percent")[0];
        const wind = document.getElementsByClassName("wind-speed")[0];
        const temperature = document.getElementsByClassName("weather-temp")[0];
        const location = document.getElementsByClassName("weather-location")[0];

        if (cityInput.value === "") {
            return 0;
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=Metric&appid=cee9be2d636c02b6e03afb73007dd57a`;

        try {
            let response = await fetch(url);
            let data = await response.json();

            

            // Update DOM elements with fetched data
            humidity.innerHTML = data.main.humidity + " %";
            wind.innerHTML = data.wind.speed + " Km/h";
            temperature.innerHTML = data.main.temp + "°";
            location.innerHTML = data.name;

            if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n" )
            {
                setWicon(clear_icon);
            }
            else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n" )
            {
                setWicon(cloud_icon)
            }
            else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n" )
            {
                setWicon(drizzle_icon)
            }
            else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n" )
            {
                setWicon(cloud_icon)
            }
            else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n" )
            {
                setWicon(rain_icon)
            }
            else if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n" )
            {
                setWicon(rain_icon)
            }
            else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n" )
            {
                setWicon(snow_icon)
            }
            else{
                setWicon(clear_icon)
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    return (
        <div className="container">
            <div className='top-bar'>
                <input type='text' className="cityinput" placeholder='Search'/>
                <div className="search-icon" onClick={search}>
                    <img src={search_icon} alt="search"/>
                </div>
            </div>
            <div className="weather-image">
                <img src={Wicon} alt=""/>
            </div>
            <div className="weather-temp">24°c</div>
            <div className="weather-location">London</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className='icon' />
                    <div className="data">
                        <div className="humidity-percent">77%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className='icon' />
                    <div className="data">
                        <div className="wind-speed">15 Km/hr</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

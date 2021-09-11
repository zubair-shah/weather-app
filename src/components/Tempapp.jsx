import React, {useEffect, useState} from "react";
import './css/style.css'

const TempApp = () =>{

const [city, setCity] = useState(null);
const [search , setSearch] = useState("karachi")

useEffect( () =>{
 
    const fetchApi = async() =>{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=050a25604fb0bf51202f16df812abd4c`
        const response = await fetch(url)
        const resJson = await response.json();
        setCity(resJson.main);
        console.log(resJson)

    }

    fetchApi();

},[search]) 


    return(
           <div className="container">
          {!city ? (
              <p>No data found</p>
          ):(
            <div className="weather-side">
            <div className="weather-gradient" />
            <div className="date-container">
              <h2 className="date-dayname">Tuesday</h2><span className="date-day">15 Jan 2019</span><i className="location-icon" data-feather="map-pin" /><span className="location">Paris, FR</span>
            </div>
            <div className="weather-container"><i className="weather-icon" data-feather="sun" />
              <h1 className="weather-temp">{search}</h1>
              <h2 className="weather-temp">{city.temp}°C</h2>
              <h3 className="weather-desc">Sunny</h3>
            </div>
          </div>
          )
          }     
      
        <div className="info-side">
          <div className="today-info-container">
            <div className="today-info">
              <div className="precipitation"> <span className="title">PRECIPITATION</span><span className="value">0 %</span>
                <div className="clear" />
              </div>
              <div className="humidity"> <span className="title">HUMIDITY</span><span className="value"> 22 %</span>
                <div className="clear" />
              </div>
              <div className="wind"> <span className="title">WIND</span><span className="value">0 km/h</span>
                <div className="clear" />
              </div>
            </div>
          </div>
          <div className="week-container">
            <ul className="week-list">
              <li className="active"><i className="day-icon" data-feather="sun" /><span className="day-name">Tue</span><span className="day-temp">29°C</span></li>
              <li><i className="day-icon" data-feather="cloud" /><span className="day-name">Wed</span><span className="day-temp">21°C</span></li>
              <li><i className="day-icon" data-feather="cloud-snow" /><span className="day-name">Thu</span><span className="day-temp">08°C</span></li>
              <li><i className="day-icon" data-feather="cloud-rain" /><span className="day-name">Fry</span><span className="day-temp">19°C</span></li>
              <div className="clear" />
            </ul>
          </div>
          <div className="location-container"><input className="location-button" defaultValue="karachi" onChange={(event)=>   {setSearch(event.target.value)} }type="search" name="" id="" /></div>
        </div>
      </div>
    )
}

export default TempApp;
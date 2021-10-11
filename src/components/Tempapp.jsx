import React, { useEffect, useState , useRef} from "react";
import './css/style.css'
import axios from 'axios';

const TempApp = () => {

  const [city, setCity] = useState(null);
  const [search, setSearch] = useState(null)
  const [location, setLocation] = useState(null)
  const cityName = useRef(null);

  useEffect(() => {
    let name = "";
    if (cityName.current.value) {
      name = `q=${cityName.current.value}`
    } else if (location) {
      
      if (!location) {

      } else if (location === "fail") {
        name = "q=new york";
      } else if (location && location.latitude) {
        name = `lat=${location.latitude}&lon=${location.longitude}`
      }
    }

    console.log("name: ", name)
    if (name) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?${name}&units=metric&appid=050a25604fb0bf51202f16df812abd4c`)
        .then(res => {
          const newWeather = res.data;
         console.log("newWeather: ", newWeather);
          setCity(newWeather);
        
         
        });
        
    }
  }, [location,search]);


  useEffect(() => {

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log("position got: ", position.coords.latitude);
          // console.log("position got: ", position.coords.longitude);
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })

        }, function (error) {

          setLocation("fail")

        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }

    getLocation()

  }, []);






  // useEffect(() => {

  //   const fetchApi = async () => {
  //     const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=050a25604fb0bf51202f16df812abd4c`
  //     const response = await fetch(url)
  //     const resJson = await response.json();
  //     setCity(resJson.main);
  //     console.log(resJson)

  //   }

  //   fetchApi();

  // }, [search])


  // let dateVariable = new Date()
//  let Currentdate =  dateVariable.getDate()
 

  return (
    <div className="container">
      {!city ? (
        <p>No data found</p>
      ) : (
        <>
        <div className="weather-side">
          <div className="weather-gradient" />
          <div className="date-container">
            <h2 className="date-dayname">Tuesday</h2><span className="date-day">Jan 2019</span><i className="location-icon" data-feather="map-pin" /><span className="location">{city?.sys.country}, FR</span>
          </div>
          <div className="weather-container"><i className="weather-icon" data-feather="sun" />
            <h1 className="weather-temp">{city.name}</h1>
            <h2 className="weather-temp">{city?.main?.temp}°C</h2>
            <h3 className="weather-desc"> sunny</h3>
          </div>
        </div>
      <div className="info-side">
        <div className="today-info-container">
          <div className="today-info">
            <div className="precipitation"> <span className="title">PRESSURE</span><span className="value">{city?.main.pressure} pascal</span>
              <div className="clear" />
            </div>
            <div className="humidity"> <span className="title">HUMIDITY</span><span className="value"> {city?.main.humidity} %</span>
              <div className="clear" />
            </div>
            <div className="wind"> <span className="title">wind</span><span className="value">{city?.wind.speed} km/h</span>
              <div className="clear" />
            </div>
          </div>d
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
      </div>
   
      </>
  )
}
      
        <div className="location-container"><input className="location-button" defaultValue="karachi" ref={cityName} type="search" name="" id="" />
          <button className="btn btn-primary" onClick={() => {
            setSearch(cityName.current.value)

          }}> Search</button>
        </div>

    </div>
  )
}

export default TempApp;
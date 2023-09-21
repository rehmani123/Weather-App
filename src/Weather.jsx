import React from 'react'
import { useState } from 'react'
import './App.css'

const api = {
    key: "30a6d3c8b4ef2ec7733b732a714e0564",
    base: "https://api.openweathermap.org/data/2.5/"
}

const Weather = () => {

    const[query,setQuery]= useState('');
    const[weather,setWeather]=useState({});

    const search = (evt)=>{
        if(evt.key === "Enter"){
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(response=> response.json())
            .then(result =>{
                setWeather(result);
                setQuery('');
                console.log(result);
            })
        }
    }

    const dateBuilder = (d)=>{
        let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return (`${day} ${date}th ${month} ${year}`)

    }
  return (
    <div className= {(typeof weather.main !="undefined") ? ((weather.main.temp >20) ? 'warm' : 'cold'): 'cold'}>
        <main>
            <div className='search-box'>
                <input type='text' className='search-bar'
                placeholder='Search Cities...'
                value={query}
                onChange={e=>setQuery(e.target.value)}
                onKeyPress={search}/>
            </div>
            {(typeof weather.main != "undefined")?(
                 <><div className='location-box'>
                      <div className='location'>
                          {weather.name},{weather.sys.country}
                          <div className='date'>
                              {dateBuilder(new Date())}
                          </div>
                      </div>
                  </div><div className='weather-box'>
                          <div className='temp'>
                              {Math.round(weather.main.temp)}°C
                          </div>
                          <div className='weather'>
                            {weather.weather[0].main}
                          </div>
                      </div></>
            ):<h1 className='city-name'>Enter City Name Correctly</h1> }
           

        </main>
    </div>
  )
}

export default Weather
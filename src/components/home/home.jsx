import { useEffect, useState } from "react"
import "./home.css"
import searchIcon from "../icons/search.jpeg"
import pin from "../icons/pin.jpeg"
export const Home=()=>{
     const [search,setSearch] =useState("pune")
     const [temp,setTemp] =useState([])

     useEffect(()=>{
        getData()
    },[search])
    const handleInput=(e)=>{
       // console.log(e.target.value)
        setSearch(e.target.value)
        // console.log(search)
    }
    const getData = async () => {
        let city = "patna"; //input from user.
       // console.log(search,"f")
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=000ea10fae727b5e0d08edbb2b5f07c0`;
        try {
          let res = await fetch(url);
          let data = await res.json();
          let lat = data.coord.lat;
          let lon = data.coord.lon;
          getDatafor7days(lat, lon);
        } catch (error) {
          console.log(error);
        }
    };
   
      const getDatafor7days = async (lat, lon) => {
        let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=000ea10fae727b5e0d08edbb2b5f07c0`;
        try {
          let res = await fetch(url);
          let data = await res.json();
          console.log("data", data);
        setTemp(data)
        } catch (error) {
          console.log(error);
        }
      };
     return (
        <>
        <div>
        <div className="searchBar">
          <div className="logoDiv">
            <img src={pin} alt="location" />
          </div>
          <div className="inputDiv">
            <input
              type="text"
              onChange={handleInput}
              className="search_bar"
              placeholder="enter your city"
            />
          </div>
          <div className="searchIconDiv">
            <img src={searchIcon} alt="search icon" />
          </div>
        </div>
            <div className="temp_div">
           
           
            { 
            temp.daily?
                temp.daily.map((e)=>(
                    <div key={e.lat}>
                        {/* {console.log(e,"abc")} */}
                        <h5><span>{Math.floor(e.temp.min-273)} °C</span> / <span>{Math.floor(e.temp.max-273)} °C</span></h5>
                          <p>{e.weather[0].description}</p>
                        <img src={`http://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`} alt="bh" />
                    </div>
                ))
                :<div>Loading...</div>
            }

           
            </div>
        </div>
        </>
    )
}
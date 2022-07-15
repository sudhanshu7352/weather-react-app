import { useEffect, useState } from "react"
import "./home.css"
import searchIcon from "../icons/search.jpeg"
import pin from "../icons/pin.jpeg"
import Chart from "react-apexcharts";

export const Home=()=>{
     const [search,setSearch] =useState("pune")
     const [temp,setTemp] =useState([])
     const [daily,setDaily] =useState([])  

     const dailyData =(e)=>{
      let arr =e.temp
      console.log(arr)
        // console.log(e,"onclick")
        setDaily(arr)
     }
     useEffect(()=>{
        getData()
    },[search])
    const handleInput=(e)=>{
       
        setSearch(e.target.value)
       
    }
    const getData = async () => {
        let city = "patna"; //input from user.
       // console.log(search,"f")
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=000ea10fae727b5e0d08edbb2b5f07c0`;
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
        let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=000ea10fae727b5e0d08edbb2b5f07c0`;
        try {
          let res = await fetch(url);
          let data = await res.json();
          // console.log("data", data);
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
                    <div className="small_div" key={e.lat} onClick={()=>dailyData(e)}>
                        {/* {console.log(e,"abc")} */}
                        <h5><span>{Math.floor(e.temp.min)} °C</span> / <span>{Math.floor(e.temp.max)} °C</span></h5>
                          <p>{e.weather[0].description}</p>
                        <img src={`http://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`} alt="bh" />
                    </div>
                ))
                :<div>Loading...</div>
            }
             </div>
            <div className="graph_div">

              <Chart
          type="area"
          series={[
            {
              name: "Temperature",
              data: [daily.morn,daily.max,daily.day,daily.min],
            },
          ]}
          options={{
            dataLabels: {
              formatter: (val) => {
                // return `${val}℃`;
              },
            },
            yaxis: {
              labels: {
                formatter: (val) => {
                  return `${Math.ceil(val)}℃`;
                },
              },
            },
            xaxis: {
              categories: ["6:00am", "12:00pm", "6:00pm", "12:00am"],
            },
          }}
          />
          </div>

           
           
        </div>
        </>
    )
}
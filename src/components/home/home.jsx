import { useEffect, useState } from "react";
import "./home.css";
import searchIcon from "../icons/search.jpeg";
import pin from "../icons/pin.jpeg";
import Chart from "react-apexcharts";
import axios from "axios";

export const Home = () => {
  const [search, setSearch] = useState("");
  const [temp, setTemp] = useState([]);
  const [daily, setDaily] = useState([]);
  const [icon, setIcon] = useState("");

  //  const city =()=>{
  //   axios.get("https://ipinfo.io/json?token=52ed0181817dc8").then((res)=>{
  //     console.log(res.data.city)
  //        setSearch(res.data.city)
  //   })
  //  }
  const dailyData = (e) => {
    let arr = e.temp;
    console.log(e);
    setIcon(e.weather[0].icon);
    //   // console.log(e,"onclick")
    setDaily(arr);
  };
  useEffect(() => {
    axios.get("https://ipinfo.io/json?token=52ed0181817dc8").then((res) => {
      console.log(res.data.city);
      setSearch(res.data.city);
    });
  }, []);
  useEffect(() => {
    getData();
  }, [search]);
  const handleInput = (e) => {
    setSearch(e.target.value);
  };
  const getData = async () => {
    //input from user.
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
      console.log("data", data);
      setTemp(data);
    } catch (error) {
      console.log(error);
    }
  };

  function TimeConvert(sunRise) {
    let hrRise = new Date(sunRise * 1000).getHours();
    if(hrRise>12){
      
      hrRise= hrRise-12
    }
    let minRise = "0" + new Date(sunRise * 1000).getMinutes();
    let rise = hrRise + ":" + minRise.substr(-2);
    return rise
  }
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
              value={search}
              placeholder="enter your city"
            />
          </div>
          <div className="searchIconDiv">
            <img src={searchIcon} alt="search icon" />
          </div>
        </div>
        <div className="temp_div">
          {temp.daily ? (
            temp.daily.map((e) => (
              <div
                className="small_div"
                tabindex="0"
                key={e.lat}
                onClick={() => dailyData(e)}
              >
                {/* {console.log(e,"abc")} */}
                <h5>
                  <span>{Math.floor(e.temp.min)} °C</span> /{" "}
                  <span>{Math.floor(e.temp.max)} °C</span>
                </h5>
                <p>{e.weather[0].description}</p>
                <img
                  src={`http://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`}
                  alt="bh"
                />
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>

        <div className="graph_div">
          {temp.daily ? (
            <div className="temp_img">
              <h1>{Math.floor(daily.max ? daily.max : temp.current.temp)}°C</h1>
              <img
                src={`http://openweathermap.org/img/wn/${
                  icon ? icon : temp.current.weather[0].icon
                }@2x.png`}
                alt="img"
              />
            </div>
          ) : (
            <div>Loading...</div>
          )}
          {daily.morn ? (
            <Chart
              type="area"
              series={[
                {
                  name: "Temperature",
                  data: [daily.morn, daily.max, daily.day, daily.min],
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
                      return `${Math.floor(val)}℃`;
                    },
                  },
                },
                xaxis: {
                  categories: ["6:00am", "12:00pm", "6:00pm", "12:00am"],
                },
              }}
            />
          ) : (
            <Chart
              type="area"
              series={[
                {
                  name: "Temperature",
                  data: [25, 36, 25, 20],
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
                      return `${Math.floor(val)}℃`;
                    },
                  },
                },
                xaxis: {
                  categories: ["6:00am", "12:00pm", "6:00pm", "12:00am"],
                },
              }}
            />
          )}

          { temp.current &&<>
          <div className="humi_div">
            <div>
              <h2>Humidity</h2>
              <p>{temp.current.humidity}%</p>
            </div>
            <div>
              <h2>Pressure</h2>
              <p>{temp.current.pressure} bar</p>
            </div>
          </div>

          <div className="sun_div">
          <div>
              <h2>Sunrise</h2>
              <p>{TimeConvert(temp.current.sunrise)} am</p>
            </div>
            <div>
              <h2>Sunset</h2>
              <p>{TimeConvert(temp.current.sunset)} pm</p>
            </div>
           </div>
          </>
            }
        </div>
      </div>
    </>
  );
};

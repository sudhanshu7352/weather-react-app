import { useEffect, useState } from "react"


export const Home=()=>{
     const [search,setSearch] =useState("")
     const [temp,setTemp] =useState([])

     useEffect(()=>{
        getData()
    },[search])
    const handleInput=(e)=>{
       // console.log(e.target.value)
        setSearch(e.target.value)
        console.log(search)
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
        setTemp(data.daily)
        } catch (error) {
          console.log(error);
        }
      };
     return (
        <>
        <div>
            <input type="text" onInput={handleInput} />
            {
         //  console.log(temp.current.weather[0].icon,"hello")
                temp.map((e)=>(
                    <div key={e.lat}>
                        {/* {console.log(e,"abc")} */}
                           <h2>{Math.floor(e.temp.min-273)}</h2> 
                           <h2>{Math.floor(e.temp.max-273)}</h2>
                        {/* <img src={`http://openweathermap.org/img/wn/${e.current.weather[0].icon}@2x.png`} alt="bh" /> */}
                    </div>
                ))
            }
            
        </div>
        </>
    )
}
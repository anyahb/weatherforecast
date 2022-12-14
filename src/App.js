import {useState, useEffect} from "react"
import './App.css'


function App() {

    const [forecastDays, setForecastDays] = useState([])
    const [avgTemp, setavgTemp] = useState("")

    const getWeather = () => {
        fetch("http://api.weatherapi.com/v1/forecast.json?key=90bcae4386e744f082d174730222407&q=Washington DC&days=3")
            .then((response) => {
                return response.json()
            })

            .then((res) => {
                setForecastDays(res.forecast.forecastday)
                // console.log(forecastDays)
            })
    }

    useEffect(() => {
        getWeather()
        console.log(1, 2, 3)
    }, [avgTemp])


    const avgTempt = () => {
        let avg = forecastDays.map((x => x.date + " : " + x.day.avgtemp_c))
        setavgTemp(avg)
        console.log(avg)
        /* for (let i = 0; i < avg.length; i++){
             console.log(avg[i].date + " : " + avg[i].day.avgtemp_c)
         }*/
        // console.log(avg)

    }



    const createTime = (str) => {
        const hey = str.split(":")
        if (parseInt(hey[0]) < 13 ){
            const num = parseInt(hey[0]) + 12
            return num + ":" + hey[1]
        }
    }

    const dateFormat = (el) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const sorter = el.split("-")
        const hey = sorter[1].slice(1)
        const resultMonths = months[parseInt(hey) - 1]
        const num = sorter[2] * 1
        const year = sorter[0]
        return `${num} ` + `${resultMonths} ` + `${year}`
    }

    const hourTemp = () => {

    }


    return (
        <div>
            <input type="text" placeholder="type the number of days"/>
            <button onClick={() => {
                console.log(forecastDays)
            }}>Confirm
            </button>

            <button onClick={avgTempt}>Average Temperature</button>


            <div className='container'>
                {forecastDays.map((item, index) => {
                    return (
                        <div key={index} className="forecast-day">
                            <div className="forecast-day__date">
                                Date: {dateFormat(item.date)}
                            </div>
                            <div className="forecast-day__temp">
                                Average temperature: {item.day.avgtemp_c}
                            </div>

                            <div>
                                Sunrise: {item.astro.sunrise}
                            </div>

                            <div>
                                Sunset: {createTime(item.astro.sunset)}

                            </div>

                            <div className="forecast-day__hourtemp">
                                Average Temperature Hourly:
                                {
                                    item.hour.map((elem,index) => {
                                        return (
                                            <div key={index}>
                                                {/*Hour: {dateFormat(elem.time)}*/}
                                                Temperature: {elem.temp_c}
                                            </div>
                                            )
                                    })
                                }
                            </div>

                        </div>
                    )
                })}
            </div>


        </div>
    )
}

export default App

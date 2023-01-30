import {useState, useEffect} from "react"
import './App.css'


function App() {

    const [forecastDays, setForecastDays] = useState([])
    const [avgTemp, setavgTemp] = useState("")
    const [forecastIcon, setForecastIcon] = useState("")
    const [forecastLocation, setForecastLocation] = useState("")
    const [temperature, setTemperature] = useState("0")

    // fact
    const [forecastTime, setForecastTime] = useState("")
    // fact


// fact


    // fact


    const getWeather = () => {
        fetch("http://api.weatherapi.com/v1/forecast.json?key=90bcae4386e744f082d174730222407&q=Washington DC&days=1")
            .then((response) => {
                return response.json()
            })

            .then((res) => {
                setForecastDays(res.forecast.forecastday)
                console.log("resforecast", res.forecast.forecastday)
                console.log(res)
                setTimeout(() => {
                    getTime()
                }, 2000)
            })

    }


    const getIcon = () => {
        fetch("http://api.weatherapi.com/v1/forecast.json?key=90bcae4386e744f082d174730222407&q=Washington DC&days=1")
            .then((response) => {
                return response.json()
            })

            .then((res) => {
                const current = res.current
                const finalIcon = current.condition.icon
                setForecastIcon(finalIcon)
            })
    }


    const getLocation = () => {
        fetch("http://api.weatherapi.com/v1/forecast.json?key=90bcae4386e744f082d174730222407&q=Washington DC&days=1")
            .then((response) => {
                return response.json()
            })

            .then((res) => {
                const finalLocation = `${res.location.name}, ${res.location.region}`
                setForecastLocation(finalLocation)
            })
    }


    // useEffect(() => {
    //     getLocation()
    // })


    // useEffect(() => {
    //     getIcon()
    // })


    useEffect(() => {
        getWeather()
    }, [])


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
        if (parseInt(hey[0]) < 13) {
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


    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date();
    let day = weekday[d.getDay()];


    let time = new Date().toLocaleTimeString([], {hour: '2-digit', minute: "2-digit"})

    /*    let findTime = () => {
            forecastDays.map((item, index) => {
                const eachObj = item.hour //array of all 23 objects

                const timePeriods = eachObj.map(x => x.time) //array of time strings, for example ['2023-01-28 00:00', ... ]

                for (let i = 0; i < timePeriods.length; i++) {
                    const modifier = timePeriods[i].split(" ")
                    const wholeHour = modifier[1] // 00:00, 01:00, 02:00
                    const currentTime = time.slice(0, 2) + ":" + "00" // my current date
                    if (currentTime === wholeHour) {
                        let result = eachObj.find( // displaying the one with my time 05:00 = 05:00
                            ({time}) => time === timePeriods[i]
                        )

                        console.log("result", result.temp_c) //getting the temperature value

                    }
                }

            })
        }

        findTime()*/

    let getTime = () => {


        const currentHour = new Date().getHours()

        console.log("curHour", currentHour)
        const currentDay = forecastDays[0]


        console.log(forecastDays)

        const timeArray = currentDay?.hour ?? []
        console.log("timeArray", timeArray)

        const findIt = timeArray.find(item => {
            const wholeTime = item.time
            const onlyHours = wholeTime.split(" ")
            const timeStr = onlyHours[1]
            const responseHour = timeStr.split(":")[0]
            console.log("reshour", responseHour)
            return responseHour === currentHour.toString()
        })

        console.log("findit", findIt)

        const temperature = findIt?.temp_f

        console.log("temp", temperature)

        // setTemperature()

        console.log("findIt", findIt)

    }


    return (
        <div>
            {/*<input type="text" placeholder="type the number of days"/>


            <button onClick={avgTempt}>Average Temperature</button>*/}

            <button onClick={() => {
                console.log(forecastDays)
                getTime()
            }}>Confirm
            </button>

            {forecastDays.map((item, index) => {
                return (

                    <div className="forecast">


                        <div className="forecast__left">


                            <img className='forecast__icon' src={forecastIcon}></img>

                            <div className='forecast__title'>
                                Weather
                            </div>

                            <div className="forecast__additional">

                                <div className="forecast__precipitation">Precipitation: {item.hour[0].precip_in}%</div>
                                <div className="forecast__humidity">Humidity: {item.hour[0].humidity}%</div>
                                <div className="forecast__wind">Wind: {item.hour[0].wind_mph} mph</div>
                                <div className="forecast__temp">Temperature Now: {temperature}°</div>
                            </div>

                        </div>

                        <div className="forecast__right">
                            <div className="forecast__city">{forecastLocation}</div>
                            <div className="forecast__weekday">{day}, {dateFormat(item.date)}</div>
                            <div className="forecast__time">{time}</div>

                        </div>
                    </div>

                )
            })}


            <div className='container'>

                {forecastDays.map((item, index) => {
                    return (
                        <div key={index} className="forecast-day">
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
                                    item.hour.map((elem, index) => {
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

import {useEffect, useState} from "react"
import './App.css'
import Precipitation from './img/kek.png'


function App() {

    const [forecastDays, setForecastDays] = useState([])
    const [forecastIcon, setForecastIcon] = useState("")
    const [forecastLocation, setForecastLocation] = useState("")
    const [temperature, setTemperature] = useState("0")
    const [result, setResult] = useState("0")
    const [allDays, setAllDays] = useState([])


    const getWeather = () => {
        fetch("http://api.weatherapi.com/v1/forecast.json?key=90bcae4386e744f082d174730222407&q=Washington DC&days")
            .then((response) => {
                return response.json()
            })

            .then((res) => {
                setForecastDays(res.forecast.forecastday)

                getTime(res.forecast.forecastday)


                const current = res.current
                const finalIcon = current.condition.icon
                setForecastIcon(finalIcon)

                const finalLocation = `${res.location.name}, ${res.location.region}`
                setForecastLocation(finalLocation)
            })
    }


    const getAllDays = () => {
        fetch("http://api.weatherapi.com/v1/forecast.json?key=90bcae4386e744f082d174730222407&q=Washington DC&days=3")
            .then((response) => {
                return response.json()
            })

            .then((res) => {
                console.log("checkforsure", res.forecast.forecastday)
                setAllDays(res.forecast.forecastday)
            })
    }


    useEffect(() => {
        getWeather()
    }, [])

    useEffect(() => {
        getAllDays()
    }, [])


    const dateFormat = (el) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const sorter = el.split("-")
        const hey = sorter[1].slice(1)
        const resultMonths = months[parseInt(hey) - 1]
        const num = sorter[2] * 1
        const year = sorter[0]
        return `${num} ` + `${resultMonths} ` + `${year}`
    }


    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date();
    let day = weekday[d.getDay()];
    let time = new Date().toLocaleTimeString([], {hour: '2-digit', minute: "2-digit"})

    // const currentHour = new Date().getHours()

    console.log("fordays", forecastDays)
    const currentDay = forecastDays[0]
    console.log("curDay", currentDay)


    // const timeArray = currentDay?.hour ?? []

    let getTime = (el) => {
        const currentHour = new Date().getHours()
        const currentDay = el[0]

        const timeArray = currentDay?.hour ?? []
        const currentWeather = timeArray.find(item => {
            const wholeTime = item.time
            const onlyHours = wholeTime.split(" ")
            const timeStr = onlyHours[1]
            const responseHour = timeStr.split(":")[0]
            return responseHour === currentHour.toString()
        })

        const laterHours = timeArray.filter(item => {
            const wholeTime = item.time
            const onlyHours = wholeTime.split(" ")
            const timeStr = onlyHours[1]
            const responseHour = timeStr.split(":")[0]
            return responseHour >= currentHour.toString()
        })

        const temperature = currentWeather?.temp_f
        setTemperature(temperature)
        setResult(laterHours)
    }


    const getHours = (item) => {
        const onlyHours = item.split(" ")
        return onlyHours[1]
    }





    return (
        <div>
            {/*<input type="text" placeholder="type the number of days"/>


            <button onClick={avgTempt}>Average Temperature</button>*/}


            {forecastDays.map((item) => {
                return (

                    <div className="forecast">


                        <div className="forecast__left">


                            <img className='forecast__icon' src={forecastIcon} alt=""></img>

                            <div className='forecast__temperature'>
                                {temperature}°
                            </div>


                            <div className="forecast__additional">
                                <div className="forecast__precipitation">Precipitation: {item.hour[0].precip_in}%</div>
                                <div className="forecast__humidity">Humidity: {item.hour[0].humidity}%</div>
                                <div className="forecast__wind">
                                    <div>
                                        Wind: {item.hour[0].wind_mph} mph
                                    </div>
                                </div>
                                {/*  <div className="forecast__temp">Temperature Now: {temperature}°</div>*/}
                            </div>

                        </div>

                        <div className="forecast__right">
                            <div className="forecast__title">Hourly Weather</div>
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
                            <div className="forecast-day__hourtemp">
                                <div className="forecast-day__date">{day}, {dateFormat(item.date)}</div>
                                {
                                    result.map((elem) => {

                                        return (
                                            <div className="forecast-day__container">
                                                <div className="forecast-day__hours">
                                                    {getHours(elem.time)}
                                                </div>
                                                <div className="forecast-day__temperature">{elem.temp_f}°</div>


                                                <div className="forecast-day__condition">
                                                    {elem.condition.text}
                                                    <img src={elem.condition.icon} alt=""></img>
                                                </div>



                                                <div className="forecast-day__precipitation">
                                                    <img src={Precipitation} alt="precipitation"/>
                                                    <div>{elem.precip_in}%</div>
                                                </div>

                                                <div className="forecast-day__wind">
                                                    <div>
                                                        {elem.wind_mph} mph
                                                    </div>
                                                </div>

                                            </div>


                                        )
                                    })

                                }

                            </div>


                        </div>


                    )
                })}


                <div className="secondDay">

                    {allDays.slice(1, 2).map((item) => {

                        return (

                            <div className="secondDay__container">
                                <div className="secondDay__date">{day}, {dateFormat(item.date)}</div>

                                {item.hour.map((item) => {
                                    return (
                                        <div className="secondDay__content">
                                            <div className="secondDay__precipitation">
                                                {getHours(item.time)}
                                            </div>

                                            <div className="secondDay_temperature">
                                                {item.temp_f}
                                            </div>

                                            <div className="secondDay__condition">
                                                {item.condition.text}
                                                <img src={item.condition.icon} alt=""></img>
                                            </div>

                                            <div className="secondDay__precipitation">
                                                <img src={Precipitation} alt="precipitation"/>
                                                <div>{item.precip_in}%</div>
                                            </div>

                                            <div className="secondDay__wind">{item.wind_mph} mph</div>

                                        </div>
                                    )

                                })}

                            </div>
                        )
                    })}
                </div>



                <div className="thirdDay">
                    {allDays.slice(2, 3).map((item) => {
                        return (

                            <div className="thirdDay__container">

                                <div className="thirdDay__date">{day}, {dateFormat(item.date)}</div>

                                {item.hour.map((item) => {
                                    return (
                                        <div className="thirdDay__content">

                                            <div className="thirdDay__hours">
                                                {getHours(item.time)}
                                            </div>


                                            <div className="thirdDay__temperature">
                                                {item.temp_f}
                                            </div>


                                            <div className="thirdDay__condition">
                                                {item.condition.text}
                                                <img src={item.condition.icon} alt=""></img>
                                            </div>



                                            <div className="thirdDay__precipitation">
                                                <img src={Precipitation} alt="precipitation"/>
                                                <div>{item.precip_in}%</div>
                                            </div>

                                            <div className="thirdDay__wind">
                                                <div>{item.wind_mph} mph</div>
                                            </div>


                                        </div>
                                    )
                                })}

                            </div>
                        )
                    })}
                </div>

            </div>

        </div>
    )
}

export default App
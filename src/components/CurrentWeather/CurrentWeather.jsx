import React, { useEffect, useState } from "react";
import { WiCelsius } from "react-icons/wi";
import { WiFahrenheit } from "react-icons/wi";

const CurrentWeather = ({
  geoData,
  displatUnit,
  changeUnit,
  chooseUnit,
  base,
  api,
}) => {
  const [weatherDesc, setWeatherDesc] = useState({});

  const { main, name, wind, weather, visibility, sys } = weatherDesc;

  let sunRiseHour, sunRiseMin, sunSetHour, sunSetMin;

  if (sys && sys.sunset && sys.sunrise) {
    sunRiseHour = new Date(sys.sunrise * 1000).getHours();
    sunRiseMin = new Date(sys.sunrise * 1000).getMinutes();
    sunSetHour = new Date(sys.sunset * 1000).getHours();
    sunSetMin = new Date(sys.sunset * 1000).getMinutes();
  }

  const weatherDetails = async (lat, lon) => {
    try {
      const fetchCurrent = await fetch(
        `${base}weather?lat=${lat}&lon=${lon}&units=${chooseUnit}&appid=${api}`
      );
      const responseData = await fetchCurrent.json();
      console.log("Current Weather", responseData);
      setWeatherDesc(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    {
      geoData &&
        geoData.lat &&
        geoData.lon &&
        weatherDetails(geoData.lat, geoData.lon);
    }
  }, [geoData, displatUnit]);

  return (
    <div className="weather text-white px-10 mt-8">
      {/* current wheather */}
      {weatherDesc && main && (
        <div className="flex gap-12">
          <div className="mainDetails flex items-center bg-[#BBD8EC] text-black rounded-3xl pr-4 gap-2">
            <img
              src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
              alt="weather"
              className=""
            />
            <div className="mainDetails_temp ">
              <p className="mainDetails_temperature flex font-semibold text-5xl justify-start">
                {Math.floor(main.temp)}
                {displatUnit === "Fahrenheit" ? (
                  <WiCelsius />
                ) : displatUnit === "Celsius" ? (
                  <WiFahrenheit size={35} />
                ) : (
                  ""
                )}
              </p>

              <p className="capitalize mainDetails_description">
                {weather[0].description}
              </p>
            </div>
          </div>
          <div className="separationLine h-36 w-0.5 bg-[#1E1E1E]"></div>
          <div className="otherDetails grid grid-cols-3 grid-row-2 ">
            <p className="otherDetails_feelsLike flex">
              Feels Like {main.feels_like}
              {displatUnit === "Fahrenheit" ? (
                <WiCelsius size={35} color="white" />
              ) : displatUnit === "Celsius" ? (
                <WiFahrenheit size={35} color="white" />
              ) : (
                ""
              )}
            </p>
            <p>Humidity = {main.humidity}%</p>
            <p>Wind Speed = {wind.speed}</p>
            <p>Atmospheric pressure = {main.pressure}hPa</p>
            <p>Visibility = {visibility}</p>
            <p>Sunrise = {`${sunRiseHour}:${sunRiseMin}AM`}</p>
            <p>Sunset = {`${sunSetHour}:${sunSetMin}PM`}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentWeather;

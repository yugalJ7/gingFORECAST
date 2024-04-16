import React, { useEffect, useState } from "react";

const CurrentWeather = ({ geoData, displatUnit, chooseUnit, base, api }) => {
  const [weatherDesc, setWeatherDesc] = useState({});

  const { main, wind, weather, visibility, sys } = weatherDesc;

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
    <div className="weather text-white px-10 mt-10">
      {weatherDesc && main && (
        <div className="flex justify-center gap-12 max-[870px]:flex-col items-center">
          <div className="mainDetails flex items-center bg-[#BBD8EC] text-black rounded-3xl pr-7 w-80 max-[516px]:w-72">
            <img
              src={`https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`}
              alt="weather"
              className="max-[516px]:w-40"
            />
            <div className="mainDetails_temperature ">
              <p className="flex font-semibold text-5xl justify-start max-[516px]:text-3xl">
                {Math.floor(main.temp)}
                {displatUnit === "Fahrenheit" ? (
                  <span className="text-2xl font-normal">&#8451;</span>
                ) : displatUnit === "Celsius" ? (
                  <span className="text-2xl font-normal">&#8457;</span>
                ) : (
                  ""
                )}
              </p>

              <p className="capitalize mainDetails_description">
                {weather[0].description}
              </p>
            </div>
          </div>
          <div className="separationLine h-48 w-0.5 bg-[#1E1E1E] mt-2 max-[870px]:hidden"></div>
          <div className="otherDetails grid grid-cols-[140px_140px_140px] grid-rows-[65px_65px_65px] gap-x-7 gap-y-3  max-[870px]:grid-rows-[65px_65px] max-[516px]:gap-x-3 max-[516px]:grid-cols-[140px_140px]">
            <div className="bg-[#1E1E1E] rounded-xl flex flex-col items-center gap-1 py-1">
              <p className="text-2xl font-semibold flex">
                {Math.floor(main.feels_like)}
                {displatUnit === "Fahrenheit" ? (
                  <span className="text-sm font-extralight mt-[2px]">
                    &#8451;
                  </span>
                ) : displatUnit === "Celsius" ? (
                  <span className="text-sm font-extralight mt-[2px]">
                    &#8457;
                  </span>
                ) : (
                  ""
                )}
              </p>
              <span className="text-sm font-extralight">Feels Like</span>
            </div>
            <div className="bg-[#1E1E1E] rounded-xl flex flex-col items-center gap-1 py-1">
              <p className="text-2xl font-semibold">
                {main.humidity} <span className=" text-xl font-medium">%</span>
              </p>
              <span className="text-sm font-extralight">Humidity</span>
            </div>
            <div className="bg-[#1E1E1E] rounded-xl flex flex-col items-center gap-1 py-1">
              <p className="text-2xl font-semibold">
                {Math.floor(wind.speed)}{" "}
                {displatUnit === "Fahrenheit" ? (
                  <span className="text-xl font-normal">m/s</span>
                ) : displatUnit === "Celsius" ? (
                  <span className="text-xl font-normal">mph</span>
                ) : (
                  ""
                )}
              </p>
              <span className="text-sm font-extralight">Wind</span>
            </div>
            <div className="bg-[#1E1E1E] rounded-xl flex flex-col items-center gap-1 py-1">
              <p className="text-2xl font-semibold">
                {main.pressure}{" "}
                <span className=" text-xl font-medium">hPa</span>
              </p>
              <span className="text-sm font-extralight">Pressure</span>
            </div>
            <div className="bg-[#1E1E1E] rounded-xl flex flex-col items-center gap-1 py-1">
              <p className="text-2xl font-semibold">{visibility}</p>
              <span className="text-sm font-extralight">Visibility</span>
            </div>
            <div className="bg-[#1E1E1E] rounded-xl flex flex-col items-center gap-1 py-1">
              <p className="text-2xl font-semibold">
                {`${sunRiseHour}:${sunRiseMin}`}{" "}
                <span className=" text-xl font-medium">AM</span>
              </p>
              <span className="text-sm font-extralight">Sunrise</span>
            </div>
            <div className="bg-[#1E1E1E] rounded-xl flex flex-col items-center gap-1 py-1">
              <p className="text-2xl font-semibold">
                {`${sunSetHour}:${sunSetMin}`}{" "}
                <span className=" text-xl font-medium">PM</span>
              </p>
              <span className="text-sm font-extralight">Sunset</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentWeather;

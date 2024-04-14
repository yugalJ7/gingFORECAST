import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CityNotFound from "../../components/CityNotFound/CityNotFound";
import CurrentWeather from "../../components/CurrentWeather/CurrentWeather";
import Forecast from "../../components/Forecast/Forecast";
const api = {
  key: "4b8e2a554aa59a26e9324c2d4cc4d503",
  base: "http://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
  const params = useParams();
  const [geoData, setGeoData] = useState({});
  const [chooseUnit, setChooseUnit] = useState("metric");
  const [displatUnit, setDisplayUnit] = useState("Fahrenheit");
  const [isCity, setIsCity] = useState(true);

  const date = new Date();

  const changeUnit = () => {
    if (displatUnit === "Fahrenheit") {
      setChooseUnit("imperial");
      setDisplayUnit("Celsius");
    }
    if (displatUnit === "Celsius") {
      setChooseUnit("metric");
      setDisplayUnit("Fahrenheit");
    }
  };

  const geoCoding = async (name) => {
    try {
      const geoData = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=${api.key}`
      );
      const dataResponse = await geoData.json();
      if (dataResponse[0]) {
        console.log("GeoData", dataResponse[0]);
        setGeoData(dataResponse[0]);
      } else {
        setIsCity(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    geoCoding(params.name);
  }, [params.name]);

  return (
    <>
      {isCity ? (
        <>
          <div className="weather-header text-white flex w-screen justify-between items-center px-10 mt-6">
            <div className="cityName">
              <p className="text-4xl font-medium">
                {geoData.name},<span className="ml-1">{geoData.country}</span>
              </p>
              <p className="mt-1 font-extralight text-sm">
                {date.toDateString()}
              </p>
            </div>
            <div className="changeUnit">
              <button
                onClick={changeUnit}
                className="bg-[#BBD8EC] text-black rounded-full px-6 py-2 text-xs min-w-32"
              >
                {displatUnit}
              </button>
            </div>
          </div>
          <CurrentWeather
            geoData={geoData}
            displatUnit={displatUnit}
            changeUnit={changeUnit}
            chooseUnit={chooseUnit}
            base={api.base}
            api={api.key}
          />
          <Forecast
            geoData={geoData}
            displatUnit={displatUnit}
            changeUnit={changeUnit}
            chooseUnit={chooseUnit}
            base={api.base}
            api={api.key}
          />
        </>
      ) : (
        <CityNotFound />
      )}
    </>
  );
};

export default Weather;

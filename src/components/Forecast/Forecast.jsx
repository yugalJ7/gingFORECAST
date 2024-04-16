import { useEffect, useState } from "react";

const Forecast = ({ geoData, displatUnit, chooseUnit, base, api }) => {
  const [forecastData, setForecastData] = useState({});
  const { list } = forecastData;

  const cityForecast = async (lat, lon) => {
    try {
      const data = await fetch(
        `${base}forecast?lat=${lat}&lon=${lon}&cnt=7&units=${chooseUnit}&appid=${api}`
      );
      const response = await data.json();
      console.log("Forecast", response);
      setForecastData(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    {
      geoData &&
        geoData.lat &&
        geoData.lon &&
        cityForecast(geoData.lat, geoData.lon);
    }
  }, [geoData, displatUnit]);

  return (
    <>
      <p className="text-white mt-20 px-16 max-[516px]:mt-10">
        Today's Weather
      </p>
      <div className="forecast flex flex-row justify-around items-center gap-4 text-white mt-6 px-16 max-[1100px]:overflow-x-scroll max-[516px]:flex-col max-[516px]:px-10 ">
        {forecastData && list && (
          <>
            {list.map((data) => {
              const { dt_txt, main, dt, weather } = data;
              return (
                <div
                  key={dt}
                  className="bg-[#1E1E1E] flex flex-col items-center rounded-xl p-4 min-w-44 max-[516px]:w-36"
                >
                  <p className="font-medium">{dt_txt.slice(11, 16)}</p>
                  <img
                    src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                    alt=""
                  />
                  <div className="flex gap-1">
                    <p className="text-lg flex">
                      {Math.floor(main.temp_max)}
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
                    <span>-</span>
                    <p className="text-lg flex">
                      {Math.floor(main.temp_min)}
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
                  </div>
                  <p className="capitalize">{weather[0].description}</p>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default Forecast;

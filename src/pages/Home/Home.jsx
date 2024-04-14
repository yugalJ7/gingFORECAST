import { useEffect, useState } from "react";
import { usefilter } from "../../App";
import { NavLink } from "react-router-dom";

const url =
  "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?order_by=name%20asc&limit=100&refine=cou_name_en%3A%22India%22&refine=timezone%3A%22Asia%22&refine=feature_code%3A%22PPLA2%22";

const Home = () => {
  const [table, setTable] = useState([]);
  const { query } = usefilter();
  // console.log(query);

  const fetchCities = async () => {
    const citiesData = await fetch(url);
    const response = await citiesData.json();
    console.log(response.results);
    setTable(response.results);
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <div className="grid grid-col-1 grid-rows-auto text-white">
      {table.map((data) => {
        return (
          <NavLink
            to={`/weather/${data.name}/${data.geoname_id}`}
            key={data.geoname_id}
          >
            <div className="flex justify-around items-center">
              <p>{data.name}</p>
              <p>{data.cou_name_en}</p>
              <p>{data.timezone}</p>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default Home;

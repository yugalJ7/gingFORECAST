import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineSortAscending } from "react-icons/ai";
import Searchbar from "../../components/Searchbar/Searchbar";

const url =
  "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100&refine=cou_name_en%3A%22India%22&refine=timezone%3A%22Asia%22&refine=feature_code%3A%22PPLA2%22";

const Home = () => {
  const { query } = Searchbar();
  const [table, setTable] = useState([]);
  const [isSorted, setIsSorted] = useState(false);

  console.log(query);

  const fetchCities = async () => {
    const citiesData = await fetch(url);
    const response = await citiesData.json();
    // console.log(response.results);
    setTable(response.results);
  };

  const sortNameAsc = () => {
    if (!isSorted) {
      const sort = [...table].sort((a, b) => a.name.localeCompare(b.name));
      setTable(sort);
      setIsSorted(true);
    }
    if (isSorted) {
      fetchCities();
      setIsSorted(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <div className="grid grid-cols-[130px_100px_130px] grid-rows-1 gap-60  bg-[#BBD8EC] text-black p-4 rounded w-86">
          <p className="cursor-pointer flex items-center" onClick={sortNameAsc}>
            City
            <span className="ml-1">
              <AiOutlineSortAscending />
            </span>
          </p>
          <p>Country</p>
          <p className="pl-6">Timezone</p>
        </div>
      </div>
      <div className="flex flex-col h-screen overflow-y-scroll w-screen items-center pt-8  text-white">
        {table.map((data) => {
          return (
            <NavLink
              to={`/weather/${data.name}/${data.geoname_id}`}
              key={data.geoname_id}
            >
              <div className="grid grid-cols-[150px_100px_100px] grid-rows-1 gap-60 pb-4 pt-4 border-b-2  border-[#1E1E1E]">
                <p>{data.name}</p>
                <p>{data.cou_name_en}</p>
                <p>{data.timezone}</p>
              </div>
            </NavLink>
          );
        })}
      </div>
    </>
  );
};

export default Home;

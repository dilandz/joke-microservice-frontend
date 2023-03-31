import React, { useEffect, useState } from "react";
import axios from "axios";

function DeliverJoke() {
  const [joke, setJoke] = useState([]);
  const [types, setTypes] = useState([]);
  const [typeSearch, setTypeSearch] = useState("");
  const selectType = ["", ...types];

  const getJoke = async () => {
    
    
    await axios
      .get("https://jokegenerater-deliverservice.centralindia.cloudapp.azure.com:3001/joke/getRandom", {
        params: {
          type: typeSearch,
        }
      })
      .then((res) => {
        setJoke(res.data);

  
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const getJokeTypes = async () => {
    await axios
      .get("https://jokegenerater-deliverservice.centralindia.cloudapp.azure.com:3001/joke/getAllType")
      .then((res) => {
        setTypes(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getJokeTypes();
  }, []);

  const handleGenerate = () => {
    getJoke();
    console.log(joke);
  };

  return (
    <div>
      <div className="flex flex-col items-center bg-gray-50 min-h-screen pt-6  sm:justify-center sm:pt-0">
        <div className="w-full px-16 py-20 mt-6 lg:max-w-4xl">
          <div className="w-full px-6 py-4 shadow dark:border dark:bg-gray-800 dark:border-gray-700 rounded-xl ring-gray-900/10">
            <h1 className=" dark:text-white text-2xl font-bold mb-5 mt-5">
              Generate Jokes
            </h1>
            <label className="dark:text-white text-md font-semibold mb-2">
              Select type
            </label>

            <select
              onChange={(e) => {
                setTypeSearch(e.target.value);
              }}
              id="countries"
              className="bg-gray-50 border mb-6 border-gray-300 text-gray-900 sm:text-sm rounded-lg  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            >
              {selectType.map((data) => (
                <option key={data.idjokeTypes}>{data.type}</option>
              ))}
            </select>
            <label className="dark:text-white text-md font-semibold mb-9">
              Joke
            </label>
            <div className="dark:text-white text-md font-semibold">
              {joke.map((data) => (
                <p className="text-2xl mb-2">-{data.joke}</p>
              ))}
            </div>
            <button
              className=" mt-4 mb-4 px-6 py-2 text-sm font-semibold rounded-md shadow-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300"
              onClick={handleGenerate}
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliverJoke;

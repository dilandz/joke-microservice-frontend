import React, { useEffect, useState } from "react";
import axios from "axios";

function DeliverJoke() {
  const [joke, setJoke] = useState([]);
  const [types, setTypes] = useState([]);
  const [typeSearch, setTypeSearch] = useState("");
  const selectType = ["", ...types];

  const getJoke = async () => {
    console.log(typeSearch);

    await axios
      .get("http://localhost:3001/joke/getRandom", {
        params: {
          type: typeSearch,
        },
      })
      .then((res) => {
        setJoke(res.data);
        console.log(res.data);
        console.log("axios call working");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const getJokeTypes = async () => {
    await axios
      .get("http://localhost:3001/joke/getAllType")
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
      <div className="flex flex-col items-center min-h-screen pt-6 bg-gray-100 sm:justify-center sm:pt-0">
        <div className="w-full px-16 py-20 mt-6 overflow-hidden bg-white rounded-lg lg:max-w-4xl">
          <div className="mb-4">
            <h1 className="font-serif text-3xl font-bold flex sm:justify-center">
              Generate Jokes
            </h1>
          </div>

          <div className="w-full px-6 py-4 bg-white rounded shadow-md ring-1 ring-gray-900/10">
            <label>Select type</label>

            <select
              onChange={(e) => {
                setTypeSearch(e.target.value);
              }}
              id="countries"
              className="mb-4 bg-gray-50 border  text-md rounded-lg  block w-full p-1.5  dark:border-gray-600"
            >
              {selectType.map((data) => (
                <option key={data.idjokeTypes}>{data.type}</option>
              ))}
            </select>
            {joke.map((data) => (
              <div>{data.joke}</div>
            ))}
            <button
              className=" mb-4 px-6 py-2 text-sm font-semibold rounded-md shadow-md text-sky-100 bg-sky-500 hover:bg-sky-700 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300"
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

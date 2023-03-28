import React, { useEffect, useState } from "react";
import axios from "axios";

function SubmitJoke() {
  const [types, setTypes] = useState([]);
  const selectType = ["", ...types];

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

  const [joke, setJoke] = useState("");
  const [type, setType] = useState("");

  function setData(e) {
    e.preventDefault();

    const newJokes = {
      joke,
      type,
    };

    //Posting data to backend
    axios
      .post("http://localhost:3003/joke/post", newJokes)
      .then(() => {
        alert("New Joke is saved!!");
        setJoke("");
        setType("");
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 bg-gray-100 sm:justify-center sm:pt-0">
        <div className="w-full px-16 py-20 mt-6 overflow-hidden bg-white rounded-lg lg:max-w-4xl">
          <div className="mb-4">
            <h1 className="font-serif text-3xl font-bold flex sm:justify-center">
              Submit New Jokes
            </h1>
          </div>

          <div className="w-full px-6 py-4 bg-white rounded shadow-md ring-1 ring-gray-900/10">
            <form>
              <div>
                <label> Enter New Joke</label>
                <input
                  className="mb-4 block w-full mt-1 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={(e) => {
                    setJoke(e.target.value);
                  }}
                />

                <label
                  for="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select an option
                </label>

                <label>Select type</label>
               
                <select
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                  id="countries"
                  className="mb-4 bg-gray-50 border  text-md rounded-lg  block w-full p-1.5  dark:border-gray-600"
                >
                  {selectType.map((data) => (
                    <option key={data.idjokeTypes}>{data.type}</option>
                  ))}
                </select>
                <button
                  className=" mb-4 px-6 py-2 text-sm font-semibold rounded-md shadow-md text-sky-100 bg-sky-500 hover:bg-sky-700 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300"
                  onClick={setData}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmitJoke;

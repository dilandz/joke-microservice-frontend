import React, { useEffect, useState } from "react";
import axios from "axios";

function SubmitJoke() {
  const [types, setTypes] = useState([]);
  const selectType = ["", ...types];
  const [joke, setJoke] = useState("");
  const [type, setType] = useState("");

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
      <div className="flex flex-col bg-gray-50 items-center min-h-screen pt-6 sm:justify-center sm:pt-0">
        <div>
          <div className="w-full px-6 py-4  shadow dark:border dark:bg-gray-800 dark:border-gray-700 rounded-xl ring-gray-900/10">
            <h1 className=" dark:text-white text-2xl font-bold mb-5">
              Submit New Jokes
            </h1>
            <form>
              <div>
                <label className="dark:text-white text-md font-semibold mb-2">
                  Enter New Joke
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                  onChange={(e) => {
                    setJoke(e.target.value);
                  }}
                />

                <label className=" mb-2 text-md font-semibold dark:text-white">
                  Select an option
                </label>

                <select
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                >
                  {selectType.map((data) => (
                    <option key={data.idjokeTypes}>{data.type}</option>
                  ))}
                </select>
                <button
                  className=" mt-4 mb-4 px-6 py-2 text-sm font-semibold rounded-md shadow-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300"
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

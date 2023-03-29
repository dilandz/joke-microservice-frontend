import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditJoke() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [joke, setJoke] = useState("");
  const [type, setType] = useState("");
  const [types, setTypes] = useState([]);

  //Get jokes based on selected id to the edit
  useEffect(() => {
    axios
      .get(`http://localhost:3002/joke/getJokeById/${id}`)
      .then((res) => {
        setJoke(res.data.joke);
        setType(res.data.type);
        console.log("data getting");
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [id]);

  

  function UpdateJoke(e) {
    e.preventDefault();

    const jokeData = {
      joke,
      type,
    };

    axios
      .patch(`http://localhost:3002/joke/updateJokeByID/${id}`, jokeData)
      .then((res) => {
        navigate("/moderatejoke");
        alert("Joke is updated!!");
        console.log("updated");
      })
      .catch((err) => {
        alert(err);
        console.log("not updating");
      });

      UpdateJokeType();
  }

  const UpdateJokeType = () => {
   
    const jokeType = {
      type,
    };

    //Posting data to MySQL
    axios
      .post("http://localhost:3002/joke/postJokeType", jokeType)
      .then((res) => {
        alert("New Joke Type is saved to mongoDB!!");
      })
      .catch((err) => {
        alert(err);
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

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 bg-gray-100 sm:justify-center sm:pt-0">
        <div className="w-full px-16 py-20 mt-6 overflow-hidden bg-white rounded-lg lg:max-w-4xl">
          <div className="mb-4">
            <h1 className="font-serif text-3xl font-bold flex sm:justify-center">
              Edit Jokes
            </h1>
          </div>

          <div className="w-full px-6 py-4 bg-white rounded shadow-md ring-1 ring-gray-900/10">
            <form>
              <div>
                <label> Edit Joke</label>
                <input
                  value={joke}
                  className="mb-4 block w-full mt-1 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={(e) => {
                    setJoke(e.target.value);
                  }}
                />
                <label>Edit type</label>

                <select
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                  id="countries"
                  className="mb-4 bg-gray-50 border  text-md rounded-lg  block w-full p-2.5  dark:border-gray-600"
                >
                  {types.map((data) => (
                    <option key={data.idjokeTypes}>{data.type}</option>
                  ))}
                </select>
                <label> Add New Joke Type</label>
                <input
                  className="mb-4 block w-full mt-1 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                />
                <button
                  onClick={UpdateJoke}
                  className=" mb-4 px-6 py-2 text-sm font-semibold rounded-md shadow-md text-sky-100 bg-sky-500 hover:bg-sky-700 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300"
                >
                  Update Joke
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditJoke;

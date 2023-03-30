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

  const handleBack = () => {
    navigate("/moderatejoke");
  }
  return (
    <div>
      <div className="flex flex-col bg-gray-50 items-center min-h-screen pt-6 sm:justify-center sm:pt-0">
        <div>
          <div className="w-full px-6 py-4  shadow dark:border dark:bg-gray-800 dark:border-gray-700 rounded-xl ring-gray-900/10">
            <h1 className=" dark:text-white text-2xl font-bold mb-5 ">
              Edit Jokes
            </h1>
            <form>
              <div>
                <label className="dark:text-white text-md font-semibold mb-2"> Edit Joke</label>
                <input
                  value={joke}
                  className="bg-gray-50 border border-gray-300 mb-2 text-gray-900 sm:text-sm rounded-lg  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                  onChange={(e) => {
                    setJoke(e.target.value);
                  }}
                />
                <label className=" mb-2 text-md font-semibold dark:text-white">Edit Type</label>

                <select
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                  id="countries"
                  className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                >
                  {types.map((data) => (
                    <option key={data.idjokeTypes}>{data.type}</option>
                  ))}
                </select>
                <label  className=" mb-2 text-md font-semibold dark:text-white"> Add New Joke Type</label>
                <input
                  className="bg-gray-50 border border-gray-300 mb-2 text-gray-900 sm:text-lg rounded-lg  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                />
                <button
                  onClick={UpdateJoke}
                  className=" mt-4 mb-4 px-6 py-2 text-sm font-semibold rounded-md shadow-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300"
                >
                  Update Joke
                </button>
                <button
                  onClick={handleBack}
                  className=" mt-4 mb-4 ml-2 px-6 py-2 text-sm font-semibold rounded-md shadow-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300"
                >
                  Back
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

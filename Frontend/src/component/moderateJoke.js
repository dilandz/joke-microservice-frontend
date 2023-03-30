import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function ModerateJoke() {
  const [jokes, setJokes] = useState([]);
  const [jokeToMySql, setJokeToMySql] = useState();
  const [typeToMySql, setTypeToMySql] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getJokes = async () => {
      await axios
        .get("https://localhost:3002/joke/getJokes")
        .then((res) => {
          setJokes(res.data.reverse());
        })
        .catch((err) => {
          alert(err.message);
        });
    };
    getJokes();
  }, [jokeToMySql, typeToMySql]);

  const deleteJoke = async (id) => {
    await axios
      .delete(`https://localhost:3002/joke/deleteJoke/${id}`)
      .then(console.log("deleted"));
    setJokeToMySql();
    setTypeToMySql();

    window.location.reload();
  };

  const handleAcceptButton = async (joke, type) => {
    const newJokes = {
      joke: joke,
      type: type,
    };
    console.log(newJokes);
    //Posting data to MySQL
    await axios
      .post("https://localhost:3002/joke/postJoke", newJokes)
      .then(() => {
        alert("New Joke is saved to MySQL!!");
        console.log("saved");
      })
      .catch((err) => {
        alert(err);
        console.log("not saved");
      });
  };

  const handleViewList = () => {
    navigate("/verifiedjoke");
  };

  return (
    <div className="relative overflow-x-auto bg-gray-50 shadow-md sm:rounded-lg">
      <div className="flex flex-row items-center gap-2">
      <button
        className="mt-4 mb-4 ml-6 mr-6 px-5 py-2 text-sm font-semibold rounded-md shadow-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300"
        onClick={handleViewList}
      >
        View Moderated Joke
      </button>
      <p>Open API Doc:</p>
      <a href="https://localhost:3003/doc/#/" className="hover:text-blue-600"> Submit Joke</a>
      <a href="https://localhost:3001/doc/#/" className="hover:text-blue-600"> Deliver Joke</a>
      <a href="https://localhost:3002/doc/#/" className="hover:text-blue-600"> Moderate Joke</a>
      </div>
      <div className="m-5 h-screen  ">
        <table className="w-full text-sm text-center dark:bg-gray-100">
          <thead className=" text-lg text-whiteuppercase bg-gray-800 dark:bg-gray-700 dark:text-white">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Joke Description</th>
              <th scope="col">Joke Type</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody className="text-base">
            {jokes.map((data, index) => (
              <tr key={data._id} className="border-cray-900 border">
                <td>{index + 1}</td>
                <td>{data.joke}</td>
                <td>{data.type}</td>
                <td>
                  <button
                    onClick={() => {
                      handleAcceptButton(data.joke, data.type);
                      deleteJoke(data._id);
                    }}
                    className="bg-blue-500 hover:bg-blue-700 mb-2 mt-2 ml-1 mr-1 text-white font-bold py-2 px-4  border-gray-400 rounded shadow"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => deleteJoke(data._id)}
                    className="bg-white hover:bg-gray-100 mb-2 mt-2 ml-1 mr-1 text-gray-800 font-bold py-2 px-4 border border-gray-400 rounded shadow"
                  >
                    Remove
                  </button>
                  <Link
                    to={`/editjoke/${data._id}`}
                    className="bg-transparent hover:bg-blue-500 mb-2 mt-2 ml-1 mr-1 text-blue-700 font-bold hover:text-white py-2.5 px-4 border border-blue-500 hover:border-transparent rounded"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ModerateJoke;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ModeratedList() {
  const [jokes, setJokes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getJokes = async () => {
      await axios
        .get("http://localhost:3002/joke/getAll")
        .then((res) => {
          setJokes(res.data.reverse());
        })
        .catch((err) => {
          alert(err.message);
        });
    };
    getJokes();
  }, []);

  const deleteJoke = async (id) => {
    await axios
      .delete(`http://localhost:3002/joke/delete/${id}`)
      .then(console.log("deleted"));

    window.location.reload();
  };

  const handleBackButton = () => {
    navigate("/moderatejoke");
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <button
        className="mt-4 mb-4 ml-6 mr-6 px-5 py-2 text-sm font-semibold rounded-md shadow-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300"
        onClick={handleBackButton}
      >
        Back
      </button>
      <div className="m-5 h-screen  ">
        <table className="w-full text-sm text-center dark:bg-gray-100">
          <thead className="text-lg text-whiteuppercase bg-gray-800 dark:bg-gray-700 dark:text-white">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Joke Description</th>
              <th scope="col">Joke Type</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody className=" text-base border-cyan-900">
            {jokes.map((data, index) => (
              <tr key={data.id} className="border-cray-900 border">
                <td>{index + 1}</td>
                <td>{data.joke}</td>
                <td>{data.jokeType}</td>
                <td>
                  <button
                    onClick={() => {
                      deleteJoke(data.id);
                    }}
                    className="bg-blue-500 hover:bg-blue-700 mb-2 mt-2 ml-1 mr-1 text-white font-bold py-2 px-4  border-gray-400 rounded shadow"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ModeratedList;

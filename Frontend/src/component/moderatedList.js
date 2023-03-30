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
        className="bg-blue-800 rounded-md m-1 text-white p-2"
        onClick={handleBackButton}
      >
        Back
      </button>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col">No</th>
            <th scope="col">Joke Description</th>
            <th scope="col">Joke Type</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {jokes.map((data, index) => (
            <tr key={data.id}>
              <td>{index + 1}</td>
              <td>{data.joke}</td>
              <td>{data.jokeType}</td>
              <td>
                <button
                  onClick={() => {
                   
                    deleteJoke(data.id);
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ModeratedList;

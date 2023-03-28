import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ModerateJoke() {
  const [jokes, setJokes] = useState([]);
  const [jokeToMySql, setJokeToMySql] = useState();
  const [typeToMySql, setTypeToMySql] = useState();

  useEffect(() => {
    const getJokes = async () => {
      await axios
        .get("http://localhost:3002/joke/getJokes")
        .then((res) => {
          setJokes(res.data.reverse());
        })
        .catch((err) => {
          alert(err.message);
        });
    };
    getJokes();
  }, [jokeToMySql, typeToMySql]);

  const DeleteJoke = async (id) => {
    await axios
      .delete(`http://localhost:3002/joke/deleteJoke/${id}`)
      .then(console.log("deleted"));
    setJokeToMySql();
    setTypeToMySql();
  };

  // TODO when data is save to mongodb and display in moderate at first try it save empyt values
  const handleAcceptButton = async (joke, type) => {
    const newJokes = {
      joke: jokeToMySql,
      type: typeToMySql,
    };

    //Posting data to MySQL
    await axios
      .post("http://localhost:3002/joke/postJoke", newJokes)
      .then((res) => {
        alert("New Joke is saved to MySQL!!");
        console.log("saved");
        setJokeToMySql(joke);
        setTypeToMySql(type);
      })
      .catch((err) => {
        alert(err);
        console.log("not saved");
      }).finally(()=>{
        console.log("FINALLY");
      });
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col">No</th>
            <th scope="col">Joke Type</th>
            <th scope="col">Joke Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {jokes.map((data, index) => (
            <tr key={data._id}>
              <td>{index + 1}</td>
              <td>{data.joke}</td>
              <td>{data.type}</td>
              <td>
                <button
                  onClick={() => {
                    handleAcceptButton(data.joke, data.type);

                    //DeleteJoke(data._id);
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() => DeleteJoke(data._id)}
                  className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                >
                  Remove
                </button>
                <Link
                  to={`/editjoke/${data._id}`}
                  className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ModerateJoke;

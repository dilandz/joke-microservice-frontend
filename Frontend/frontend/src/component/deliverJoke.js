import React, { useEffect, useState } from "react";
import axios from "axios";

function DeliverJoke() {
  const [joke, setJoke] = useState("");
  //const [type, setType] = useState("");


  const getJoke = async () => {
    await axios
      .get("http://localhost:3001/joke/getAll")
      .then((res) => {
        setJoke(res.data);
        
      })
      .catch((err) => {
        alert(err.message);
       
      });
  };

  useEffect(() => {
    getJoke();
  }, []);
   

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
            <form>
            {joke && (    
              <div>
              {joke.map((data)=>(
                
                <h2
                  className="mb-2 "  
                > {data.joke}</h2>
          
              ))}
                <button
                  className=" mb-4 px-6 py-2 text-sm font-semibold rounded-md shadow-md text-sky-100 bg-sky-500 hover:bg-sky-700 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300"
                  onClick={getJoke}
                >
                  Generate
                </button>
              </div>
               )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliverJoke;

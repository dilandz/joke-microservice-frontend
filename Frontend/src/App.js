import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/deliverJoke";
import SubmitPage from "./component/submitJoke";
import ModeratePage from "./component/moderateJoke";
import EditPage from "./component/editJoke";
import Login from "./component/login";
import ModeratedJoke from "./component/moderatedList";

function App() {
  return (
    <Router>
      <div className="App">
        
        <nav className="flex sm:justify-center space-x-4 shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          {[
            ["HOME", "/"],
            ["SUBMIT JOKE", "/submitjoke"],
            ["ADMIN", "/login"],
            
          ].map(([title, url], i) => (
            <a
              href={url}
              className="rounded-lg px-3 py-2 text-white font-medium hover:bg-gray-700 "
              key={i}
            >
              {title}
            </a>
          ))}
        </nav>
        
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/submitjoke" element={<SubmitPage />}></Route>
          <Route exact path="/moderatejoke" element={<ModeratePage />}></Route>
          <Route exact path="/editjoke/:id" element={<EditPage />}></Route>
          <Route exact path="/verifiedjoke" element={<ModeratedJoke />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

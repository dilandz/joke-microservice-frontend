import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/deliverJoke";
import SubmitPage from "./component/submitJoke";
import ModeratePage from "./component/moderateJoke";
import EditPage from "./component/editJoke";

function App() {
  return (
    <Router>
      <div className="App">
        
        <nav className="flex sm:justify-center space-x-4 ">
          {[
            ["Home", "/deliverjoke"],
            ["Submit Joke", "/submitjoke"],
            ["Moderate Joke", "/moderatejoke"],
            
          ].map(([title, url]) => (
            <a
              href={url}
              className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
            >
              {title}
            </a>
          ))}
        </nav>
        
        <Routes>
          <Route exact path="/deliverjoke" element={<Home />}></Route>
          <Route exact path="/submitjoke" element={<SubmitPage />}></Route>
          <Route exact path="/moderatejoke" element={<ModeratePage />}></Route>
          <Route exact path="/editjoke/:id" element={<EditPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

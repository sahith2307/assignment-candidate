import logo from "./logo.svg";
import "./App.css";
import AddCandidate from "./components/addCandidate";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ShowCandidates from "./components/showCandidates";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/candidates" />} />
          <Route path="/candidates" element={<ShowCandidates />} />
          <Route path="/addCandidate" element={<AddCandidate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

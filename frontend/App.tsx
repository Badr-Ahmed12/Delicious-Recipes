import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecipeDetails from "./page/RecipeDetails";
import GetStarted from "./page/GetStart";
import Home from "./page/Home";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </Router>
  );
};

export default App;


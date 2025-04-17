import "./App.css";


import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AppRouter from "./AppRouter";

function App() {
  

  return (
    <div>
      <Router>
        <AppRouter />
      </Router>
    </div>
  );
}

export default App;

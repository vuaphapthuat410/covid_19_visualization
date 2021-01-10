import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Graph from "./pages/Graph";
import Symptom from "./pages/Symptom";
import {Vietnam} from "./components";

import Nav from "./Nav";
import Footer from "./Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/symptom" component={Symptom} />
          <Route path="/graph" component={Graph} />
          <Route path="/about" component={About} />
          <Route path="/vietnam" component={Vietnam} /> 
        </Switch>
      </div>
    </Router>
  );
}

export default App;

import React, { Component } from "react";
import Main from "../src/container/Main/Main";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path="/task-organizer" exact component={Main} />
          <Route path="/" exact component={Main} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

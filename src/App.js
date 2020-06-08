import React, { Component } from "react";
import Main from "../src/container/Main/Main";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/task-organizer" exact component={Main} />
            <Route path="/" exact component={Main} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

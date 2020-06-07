import React, { Component } from "react";
import TaskTable from "../Task-Table/TaskTable";
import LiveTimer from "../Live-Timer/LiveTimer";

class Main extends Component {
  render() {
    return (
      <div className="container-fluid">
        <h1 className="display-4">
          <strong>Automated Task Organizer</strong>
        </h1>
        <div className="row">
          <div className="col-md-6 mt-5">
            <LiveTimer />
          </div>

          {/* task table */}
          <div className="col-md-6 mt-5">
            <TaskTable />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;

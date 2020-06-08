import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import LiveTimerLayout from "../../components/LiveTimerLayout/LiveTimerLayout";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/actions";

class LiveTimer extends Component {
  render() {
    let sum = 0;
    const taskDuraion = this.props.tasks.map((task) => {
      sum += +task.duration;
      if (sum <= 60) return +task.duration;
    });
    const sortedTaskDuration = taskDuraion.sort(function (a, b) {
      return a - b;
    });
    sortedTaskDuration.unshift(0);
    let temp = 0;
    const updatedTaskDuration = sortedTaskDuration.map((task, index) => {
      if (index === 0) return task;
      else {
        console.log(temp);
        temp += task;
        return temp;
      }
    });
    console.log(updatedTaskDuration);
    if (this.props.ctr === 3) {
      this.props.notificationHandler(2);
    }
    return (
      <Aux>
        <div className="float-left">
          <h4>Live Timer</h4>
        </div>
        <div className="float-left ml-5">
          <button
            disabled={this.props.play}
            onClick={() => this.props.playTimerHandler(this.props.ctr)}
            className="btn btn-outline-primary mr-2"
          >
            <i className="fas fa-play-circle" />
            &nbsp;start
          </button>
          <button
            disabled={this.props.pause}
            onClick={this.props.pauseTimerHandler}
            className="btn btn-outline-secondary mr-2"
          >
            <i className="fas fa-pause-circle" />
            &nbsp;pause
          </button>
          <button
            onClick={this.props.resetTimerHandler}
            className="btn btn-outline-secondary"
          >
            <i className="fas fa-redo" />
            &nbsp;reset
          </button>
        </div>

        <div className="mt-5">
          <LiveTimerLayout tasks={this.props.tasks} ctr={this.props.ctr} />
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    ctr: state.counter,
    play: state.play,
    pause: state.pause,
    notification: state.notification,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    playTimerHandler: (counter) => dispatch(actionCreators.playTimer(counter)),
    pauseTimerHandler: () => dispatch(actionCreators.pauseTimer()),
    resetTimerHandler: () => dispatch(actionCreators.resetTimer()),
    notificationHandler: (value) =>
      dispatch(actionCreators.pushNofication(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LiveTimer);

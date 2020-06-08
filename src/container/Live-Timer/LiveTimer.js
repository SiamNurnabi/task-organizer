import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import LiveTimerLayout from "../../components/LiveTimerLayout/LiveTimerLayout";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/actions";
import { Toast } from "react-bootstrap";

class LiveTimer extends Component {
  state = {
    show: true,
  };

  closeToasthandler = () => {
    const showToast = this.state.show;
    this.setState({ show: !showToast });
  };

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
    let temp = this.props.temp;
    const updatedTaskDuration = sortedTaskDuration.map((task, index) => {
      if (index === 0) return task;
      else {
        console.log(temp);
        temp += task;
        return temp;
      }
    });
    // console.log(sortedTaskDuration);
    // console.log(updatedTaskDuration);

    let notification = (
      <p style={{ textAlign: "center" }}>Task has not started yet!!</p>
    );
    if (this.props.alert) {
      notification = updatedTaskDuration.map((task, index) => {
        console.log(task);
        console.log(this.props.ctr);

        if (this.props.ctr === task)
          return (
            <Toast
              key={index}
              show={this.state.show}
              onClose={this.closeToasthandler}
              delay="10000"
              autohide
            >
              <Toast.Header>
                <i className="fas fa-bell" />
                &nbsp;<strong className="mr-auto">Task is starting</strong>
              </Toast.Header>
            </Toast>
          );
      });
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
        <div
          className="container"
          aria-live="polite"
          aria-atomic="true"
          style={{
            position: "relative",
            minHeight: "200px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
            }}
          >
            {notification}
          </div>
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
    alert: state.alert,
    temp: state.temp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    playTimerHandler: (counter) => dispatch(actionCreators.playTimer(counter)),
    pauseTimerHandler: () => dispatch(actionCreators.pauseTimer()),
    resetTimerHandler: () => dispatch(actionCreators.resetTimer()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LiveTimer);

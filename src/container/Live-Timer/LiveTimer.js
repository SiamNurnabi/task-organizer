import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import LiveTimerLayout from "../../components/LiveTimerLayout/LiveTimerLayout";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/actions";
import { Toast } from "react-bootstrap";

class LiveTimer extends Component {
  state = {
    counterState: this.props.ctr,
  };

  componentDidUpdate() {
    let sum = 0;
    const taskDuration = [...this.props.tasks];
    const sortedTask = taskDuration.sort((a, b) => a.duration - b.duration);
    const modifiedTask = sortedTask.map((task) => {
      sum += +task.duration;
      if (sum <= 60) return task;
    });
    const updatedTask = modifiedTask.filter((task) => task !== undefined);
    let alertTime = 0;
    if (this.props.valid) {
      updatedTask.forEach((task) => {
        if (
          this.props.ctr === alertTime &&
          this.state.counterState !== this.props.ctr
        ) {
          this.setState({ counterState: this.props.ctr });
          this.props.notificationHandler(new Date(), task.name, alertTime);
        }
        alertTime += Math.floor(task.duration);
      });
    }
  }

  render() {
    console.log(this.props.notifications);
    let alert = <p style={{ textAlign: "center" }}>Start the timer</p>;
    if (this.props.valid) {
      alert = this.props.notifications.map((task, index) => {
        return (
          <Toast
            key={index}
            show={true}
            onClose={() => this.props.closeNotificationHandler(task.id)}
            className="mb-2"
          >
            <Toast.Header>
              <i className="fas fa-bell" />
              &nbsp;
              <strong className="mr-auto">{task.name} has Started</strong>
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
        <div className="float-left ml-5 mb-2">
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
          <div className="float-right ml-3">
            <p style={{ textAlign: "center" }}>
              {this.props.play
                ? "Your timer is running"
                : this.props.ctr === -1
                ? "Your timer is ready"
                : "Your timer is pasued"}
            </p>
          </div>
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
              left: "150px",
              textAlign: "center",
            }}
          >
            <div className="container pb-2 mb-5">{alert}</div>
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
    valid: state.valid,
    notifications: state.notifications,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    playTimerHandler: (counter) => dispatch(actionCreators.playTimer(counter)),
    pauseTimerHandler: () => dispatch(actionCreators.pauseTimer()),
    resetTimerHandler: () => dispatch(actionCreators.resetTimer()),
    notificationHandler: (id, name, duration) =>
      dispatch(actionCreators.pushNofication(id, name, duration)),
    closeNotificationHandler: (id) =>
      dispatch(actionCreators.closeNofication(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LiveTimer);

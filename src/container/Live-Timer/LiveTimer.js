import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import LiveTimerLayout from "../../components/LiveTimerLayout/LiveTimerLayout";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/actions";

class LiveTimer extends Component {
  render() {
    // const taskDurationArray = Object.keys(this.props.tasks).map((task) => {
    //   return task;
    // });

    // const pauseTimerHandler = () => clearInterval(this.props.playTimerHandler);
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

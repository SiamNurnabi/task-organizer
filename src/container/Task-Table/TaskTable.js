import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import * as actionCreators from "../../store/actions/actions";
// import * as actionTypes from "../../store/actions/actions";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import Aux from "../../hoc/Auxiliary/Auxiliary";

class TaskTable extends Component {
  state = {
    tasks: {
      id: new Date(),
      name: "",
      duration: "",
    },
    editId: "",
    show: false,
  };
  nameAddHandler = (event) => {
    this.setState({ name: event.target.value });
  };
  durationAddHandler = (event) => {
    this.setState({ duration: event.target.value });
  };
  taskChangeHandler = (id, name) => {
    this.setState({ show: true, editId: id });
  };
  handleClose = () => {
    this.setState({ show: false });
  };
  handleConfirm = () => {
    this.setState({ show: false });
    this.props.editTaskHandler(
      this.state.editId,
      this.state.name,
      this.state.duration
    );
  };
  render() {
    let tasks = <p className="text-center">Please add task</p>;
    if (this.props.tasks) {
      tasks = this.props.tasks.map((task, index) => {
        return (
          <tbody key={task.id + index}>
            <tr className="text-success">
              <td>{task.name}</td>
              <td>{task.duration} second</td>
              <td>
                <Button
                  vibrant="outline-primary"
                  onClick={() => this.taskChangeHandler(task.id)}
                >
                  Edit
                </Button>
                <button
                  className="btn btn-outline-primary ml-2"
                  onClick={() => this.props.deleteTaskHandler(task.id + index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        );
      });
    }

    return (
      <Aux>
        <div className="float-left">
          <h4>Task Table</h4>
        </div>
        <input
          type="text"
          placeholder="Name"
          onChange={this.nameAddHandler}
          value={this.state.name}
        />
        <input
          type="number"
          min="1"
          placeholder="Duration"
          onChange={this.durationAddHandler}
          value={this.state.duration}
        />
        <div className="float-right">
          <button
            className="btn btn-secondary mb-3"
            onClick={() =>
              this.props.addTaskHandler(this.state.name, this.state.duration)
            }
          >
            Add Task
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered table-md">
            <thead className="thead-dark">
              <tr>
                <th>Task Name</th>
                <th>Task Duration</th>
                <th>Actions</th>
              </tr>
            </thead>

            {tasks}
          </table>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                type="text"
                placeholder="name"
                onChange={this.nameAddHandler}
                value={this.state.name}
              />
              <input
                min="1"
                type="number"
                placeholder="duration"
                onChange={this.durationAddHandler}
                value={this.state.duration}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.handleConfirm}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addTaskHandler: (name, duration) =>
//       dispatch({ type: actionTypes.ADD_TASK, name: name, duration: duration }),
//     deleteTaskHandler: (id) =>
//       dispatch({ type: actionTypes.DELETE_TASK, taskId: id }),
//     editTaskHandler: (id, name, duration) =>
//       dispatch({
//         type: actionTypes.EDIT_TASK,
//         name: name,
//         taskId: id,
//         duration: duration,
//       }),
//   };
// };
const mapDispatchToProps = (dispatch) => {
  return {
    addTaskHandler: (name, duration) =>
      dispatch(actionCreators.addTask(name, duration)),
    deleteTaskHandler: (id) => dispatch(actionCreators.deleteTask(id)),
    editTaskHandler: (id, name, duration) =>
      dispatch(actionCreators.editTask(id, name, duration)),
    // editTaskHandler: (id, name, duration) =>
    //   dispatch({
    //     type: actionTypes.EDIT_TASK,
    //     name: name,
    //     taskId: id,
    //     duration: duration,
    //   }),
  };
};

// TaskTable.propTypes = {
//   value: PropTypes.number.isRequired,
// };

export default connect(mapStateToProps, mapDispatchToProps)(TaskTable);

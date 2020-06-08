import * as actionTypes from "../store/actions/actions";

const initialState = {
  // { id: 1, name: "siam", duration: "15" }
  tasks: [],
  counter: 0,
  play: false,
  pause: true,
  notification: false,
};
const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.ADD_TASK) {
    if (action.name && action.duration) {
      return {
        ...state,
        tasks: state.tasks.concat({
          id: new Date(),
          name: action.name,
          duration: action.duration,
        }),
      };
    }
  }
  if (action.type === actionTypes.DELETE_TASK) {
    const updatedTasks = state.tasks.filter(
      (task, index) => task.id + index !== action.taskId
    );
    return {
      ...state,
      tasks: updatedTasks,
    };
  }
  if (action.type === actionTypes.EDIT_TASK) {
    const updatedTasks = state.tasks.filter(
      (task) => task.id !== action.taskId
    );
    return {
      ...state,
      tasks: updatedTasks.concat({
        id: new Date(),
        name: action.name,
        duration: action.duration,
      }),
    };
  }

  if (action.type === actionTypes.PLAY_TIMER) {
    return {
      ...state,
      counter: state.counter + 1,
      play: true,
      pause: false,
      notification: true,
    };
  }
  if (action.type === actionTypes.PAUSE_TIMER) {
    return {
      ...state,
      play: false,
      pause: true,
      notification: false,
    };
  }
  if (action.type === actionTypes.RESET_TIMER) {
    return {
      ...state,
      counter: 0,
      play: false,
      pause: true,
    };
  }
  if (action.type === actionTypes.PUSH_NOTIFICATION) {
    return {
      ...state,
      notification: false,
    };
  }

  return state;
};

export default reducer;

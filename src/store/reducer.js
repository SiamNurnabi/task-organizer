import * as actionTypes from "../store/actions/actions";

const initialState = {
  tasks: [
    { id: 1, name: "task 1", duration: 15 },
    { id: 2, name: "task 2", duration: 2.5 },
    { id: 3, name: "task 3", duration: 25 },
    { id: 4, name: "task 4", duration: 40 },
    { id: 5, name: "task 5", duration: 10 },
    { id: 6, name: "task 6", duration: 15 },
    { id: 7, name: "task 7", duration: 20 },
  ],
  counter: -1,
  play: false,
  pause: true,
  valid: false,
  notifications: [],
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
    if (action.name && action.duration) {
      return {
        ...state,
        tasks: updatedTasks.concat({
          id: new Date(),
          name: action.name,
          duration: action.duration,
        }),
      };
    }
  }

  if (action.type === actionTypes.PLAY_TIMER) {
    return {
      ...state,
      counter: state.counter + 1,
      play: true,
      pause: false,
      valid: true,
    };
  }
  if (action.type === actionTypes.PAUSE_TIMER) {
    return {
      ...state,
      play: false,
      pause: true,
      valid: true,
    };
  }
  if (action.type === actionTypes.RESET_TIMER) {
    return {
      ...state,
      counter: -1,
      play: false,
      pause: true,
      valid: false,
      notifications: [],
    };
  }
  if (action.type === actionTypes.PUSH_NOTIFICATION) {
    return {
      ...state,
      notifications: state.notifications.concat({
        id: action.id,
        name: action.name,
        duration: action.duration,
      }),
    };
  }
  if (action.type === actionTypes.CLOSE_NOTIFICATION) {
    const updatedNotification = state.notifications.filter((task) => {
      if (task.id !== action.notificationId) return task;
    });
    return {
      ...state,
      notifications: updatedNotification,
    };
  }

  return state;
};

export default reducer;

export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const EDIT_TASK = "EDIT_TASK";

export const deleteTask = (id) => {
  return {
    type: DELETE_TASK,
    taskId: id,
  };
};

export const editTask = (id, name, duration) => {
  return {
    type: EDIT_TASK,
    name: name,
    duration: duration,
    taskId: id,
  };
};

export const newTask = (name, duration) => {
  return {
    type: ADD_TASK,
    name: name,
    duration: duration,
  };
};

export const addTask = (name, duration) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(newTask(name, duration));
    }, 0);
  };
};

export const PLAY_TIMER = "PLAY_TIMER";
export const PAUSE_TIMER = "PAUSE_TIMER";
export const RESET_TIMER = "RESET_TIMER";
export const PUSH_NOTIFICATION = "PUSH_NOTIFICATION";
export const MODIFY_NOTIFICATION = "MODIFY_NOTIFICATION";

let timer = null;
export const playTimer = () => {
  return (dispatch) => {
    let cnt = 0;
    clearInterval(timer);
    timer = setInterval(() => {
      dispatch({ type: PLAY_TIMER });
      cnt++;
      if (cnt === 61) {
        clearInterval(timer);
        dispatch({ type: RESET_TIMER });
      }
    }, 1000);
  };
};

export const pauseTimer = () => {
  return (dispatch) => {
    setTimeout(() => {
      clearInterval(timer);
      dispatch({ type: PAUSE_TIMER });
    }, 0);
  };
};
export const resetTimer = () => {
  return (dispatch) => {
    setTimeout(() => {
      clearInterval(timer);
      dispatch({ type: RESET_TIMER });
    }, 0);
  };
};

let alert = null;
export const pushNofication = (value) => {
  return {
    type: PUSH_NOTIFICATION,
    value: value,
  };
};

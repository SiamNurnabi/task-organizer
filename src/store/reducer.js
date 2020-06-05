const initialState = {
  tasks: [],
};
const reducer = (state = initialState, action) => {
  if (action.type === "ADD_TASK") {
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
  if (action.type === "DELETE_TASK") {
    const updatedTasks = state.tasks.filter(
      (task, index) => task.id + index !== action.taskId
    );
    return {
      ...state,
      tasks: updatedTasks,
    };
  }
  if (action.type === "EDIT_TASK") {
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
  return state;
};
export default reducer;

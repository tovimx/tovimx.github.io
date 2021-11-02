import { ADD_TASK } from "./actionTypes";

const initialState = {
  tasks: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK:
      let nameAlreadyExists = state.tasks.findIndex(
        (task) => task.name === action.payload.name
      );
      console.log(nameAlreadyExists);
      let tasksArray = [...state.tasks];

      if (nameAlreadyExists >= 0) {
        const duplicate = tasksArray[nameAlreadyExists];
        console.log("duplicate", duplicate);
        tasksArray[nameAlreadyExists] = {
          ...duplicate,
          time: duplicate.time + action.payload.time,
        };
      } else {
        tasksArray.push(action.payload);
      }

      return {
        ...state,
        tasks: tasksArray,
      };
    default:
      return state;
  }
}

export default reducer;

import { ADD_TASK } from "./actionTypes";

export const setTask = (task) => {
  return {
    type: ADD_TASK,
    payload: task,
  };
};

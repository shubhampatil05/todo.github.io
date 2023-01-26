import { createSlice } from "@reduxjs/toolkit";

const getLocalData =
  localStorage.getItem("myList") !== null
    ? JSON.parse(localStorage.getItem("myList"))
    : [];

const initialState = {
  todos: getLocalData,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,

  reducers: {
    add: (state, action) => {
      state.todos.push({
        id: Math.random(),
        item: action.payload,
        status: "Pending",
      });

      localStorage.setItem("myList", JSON.stringify(state.todos));
    },

    //--------------------------------------

    edit: (state, action) => {
      state.todos.filter((curr, id) => {
        if (curr.id === action.payload) {
          return state[action.payload].item;
        }
      });
      localStorage.setItem("myList", JSON.stringify(state.todos));
    },

    //--------------------------------------

    fulfill: (state, action) => {
      state.todos.filter((curr, id) => {
        if (id === action.payload) {
          curr.status = "Fulfilled";
        }
      });
      localStorage.setItem("myList", JSON.stringify(state.todos));
    },

    //--------------------------------------

    remove(state, action) {
      // state.pop(action.payload) // use this method  insted of filter
      const filtred = state.todos.filter((item) => item.id !== action.payload);

      state.todos = filtred;

      localStorage.setItem("myList", JSON.stringify(state.todos));
    },

    update: (state, action) => {
      state.todos.filter((currEle, id) => {
        if (id === action.payload.id) {
          state.todos[action.payload.id] = {
            item: action.payload.inputValue,
            status: "Pending",
          };
        }
      });
      localStorage.setItem("myList", JSON.stringify(state.todos));
    },
  },
});

export const { add, edit, fulfill, remove, update } = todoSlice.actions;
export default todoSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    tasks: [],
  },
  reducers: {
    addTask: (state, action) => {
      const { text, price, quantity } = action.payload;

      if (text.trim() !== "") {
        state.tasks.push({
          id: Date.now(),
          text,
          price: price || 0,
          quantity: quantity || 0,
          completed: false,
        });
      }
    },

    toogleTaskCompletion: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },

    incrementTaskQuantity: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.quantity += 1;
      }
    },

    decrementTaskQuantity: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task && task.quantity > 0) {
        task.quantity -= 1;
      }
    },
  },
});

export const {
  addTask,
  toogleTaskCompletion,
  deleteTask,
  incrementTaskQuantity,
  decrementTaskQuantity,
} = counterSlice.actions;

export default counterSlice.reducer;

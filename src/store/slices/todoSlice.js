import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const storage = JSON.parse(localStorage.getItem("todo"));
const checkstorage = () => (storage.length > 0 ? storage : []);
console.log(checkstorage());
const initialState = checkstorage();
export const saveToStorage = createAsyncThunk(
  "todo/saveToStorage",
  async (_, store) => {
    const items = store.getState().todo;
    localStorage.setItem("todo", JSON.stringify(items));
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.splice(action.payload.id, 1);
    },
    editTodo: (state, action) => {
      state[action.payload.id] = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveToStorage.fulfilled, (state, action) => {
      console.log(action);
    });
  },
});
export const { addTodo, deleteTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;

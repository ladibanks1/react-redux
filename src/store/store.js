import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import { saveToStorage } from "./slices/todoSlice";
const store = configureStore({
    reducer : {
        todo : todoReducer
    },
})


export default store;
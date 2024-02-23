import {configureStore  } from "@reduxjs/toolkit";
 import userLoginReducer from "./slices/userSlice";
 import notesReducer from "./slices/noesSlice";


const store = configureStore({
    reducer : {
userLogin : userLoginReducer,
notes : notesReducer
    }
})

export default store
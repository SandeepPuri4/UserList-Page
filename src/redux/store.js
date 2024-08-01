import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

// Configure the Redux store
const store = configureStore({
  reducer: {
    // Combine reducers here
    // The key 'users' will be used to access the user slice's state
    users: userReducer,
  },
});

// Export the store to be used in the app
export default store;

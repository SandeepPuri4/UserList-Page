import React from "react";
import UserList from "./components/userList"; // Import the UserList component
import { Provider } from "react-redux"; // Import the Provider component from react-redux
import store from "./redux/store"; // Import the configured Redux store

function App() {
  return (
    // The Provider component makes the Redux store available to the entire app
    <Provider store={store}>
      <div className="App">
        {/* Render the UserList component */}
        <UserList />
      </div>
    </Provider>
  );
}

export default App; // Export the App component to be used in other parts of the application

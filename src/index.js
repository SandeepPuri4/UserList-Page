import React from 'react'; // Import React library
import ReactDOM from 'react-dom/client'; // Import ReactDOM for rendering React components

import './index.css'; // Import global CSS styles
import App from './App'; // Import the main App component

// Create a root element to render the React application into
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root element
root.render(
  <React.StrictMode>
    {/* React.StrictMode is a wrapper that helps identify potential problems in the application */}
    <App />
  </React.StrictMode>
);

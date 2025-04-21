import React from 'react'; // Importing React to use JSX and other React features
import ReactDOM from 'react-dom/client'; // Importing ReactDOM to render the React application in the DOM
import './index.css'; // Importing global CSS styles for the app
import App from './App'; // Importing the main App component that contains all routes and logic
import reportWebVitals from './reportWebVitals'; // Importing the reportWebVitals function to track performance metrics

// Creating a root element in the DOM where the React app will be mounted
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the App component inside the root element and wrapping it with React.StrictMode
root.render(
  <React.StrictMode>
    {/* App is the entry point of the app, and React.StrictMode helps highlight potential problems in the app */}
    <App />
  </React.StrictMode>
);

// reportWebVitals is a function that helps measure the performance of the app
reportWebVitals();

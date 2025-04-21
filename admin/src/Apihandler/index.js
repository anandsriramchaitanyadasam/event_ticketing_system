// Importing the axios library to make HTTP requests
import axios from "axios";

// Base URL for the server, used as a prefix for all API requests
export const serverUrl = "http://localhost:80/api";

// Function to format a date string into a human-readable date format
export const formatDate = (dateString) => {
  const date = new Date(dateString);  // Create a Date object from the provided string
  return date.toLocaleDateString();  // Convert the date to a local date string format
};

// Function to handle GET requests (general case) for the provided endpoint
export const getApihandler = async (endPoint) => {
  try {
    // Making a GET request to the server using the given endpoint
    const getres = await axios.get(serverUrl + endPoint);
    return getres.data;  // Return the response data from the server
  } catch (error) {
    return { error };  // Return an error object if the request fails
  }
};

// Function to handle GET requests (specific by ID) for the provided endpoint
export const getbyidApihandler = async (endPoint) => {
  try {
    const getres = await axios.get(serverUrl + endPoint);  // Same as getApihandler but may be used for fetching data by ID
    return getres.data;
  } catch (error) {
    return { error };
  }
};

// Function to handle POST requests for login (specific to login endpoints)
export const postLoginApihandler = async (endPoint, value) => {
  try {
    // Making a POST request to the login endpoint with provided data (value)
    const postRes = await axios.post(serverUrl + endPoint, value);
    return postRes.data;  // Return the response data from the server
  } catch (error) {
    return { error };  // Return an error object if the request fails
  }
};

// General function to handle POST requests for other API endpoints
export const postApihandler = async (endPoint, value) => {
  console.log("postvalue=>", endPoint);  // Logging the endpoint for debugging purposes
  console.log("postvalue=>", value);    // Logging the data being posted for debugging purposes
  
  try {
    // Making a POST request to the server with provided data (value)
    const postRes = await axios.post(serverUrl + endPoint, value);
    console.log("apipost=>", postRes);  // Logging the response for debugging purposes
    return postRes.data;  // Return the response data
  } catch (error) {
    return { error };  // Return an error object if the request fails
  }
};

// Function to handle DELETE requests for the provided endpoint
export const deleteApihandler = async (endPoint) => {
  try {
    // Making a DELETE request to the server for the specified endpoint
    const deleteRes = await axios.delete(serverUrl + endPoint);
    return deleteRes.data;  // Return the response data
  } catch (error) {
    return { error };  // Return an error object if the request fails
  }
};

// Function to handle PUT requests (updates) for the provided endpoint with new data
export const putApihandler = async (endPoint, value) => {
  try {
    // Making a PUT request to the server to update data with the provided value
    const res = await axios.put(serverUrl + endPoint, value);
    return res.data;  // Return the updated data from the server
  } catch (error) {
    return { error };  // Return an error object if the request fails
  }
};

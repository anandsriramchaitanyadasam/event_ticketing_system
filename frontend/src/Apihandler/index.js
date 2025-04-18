/** @format */

// Importing axios library to make HTTP requests
import axios from "axios";

// Base URL of the backend API
export const serverUrl = "http://localhost:80/api";

// Utility function to convert a date string into a localized, readable format
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // e.g., "4/7/2025"
};

// Function to perform a GET request to a specified endpoint
export const getApihandler = async (endPoint) => {
  try {
    const getres = await axios.get(serverUrl + endPoint); // Send GET request
    return getres.data; // Return the response data
  } catch (error) {
    return { error }; // Return error object if request fails
  }
};

// Function to perform a GET request by ID or for a specific item
export const getbyidApihandler = async (endPoint) => {
  try {
    const getres = await axios.get(serverUrl + endPoint); // Send GET request
    // console.log("getresbyid=>", getres); // Debug log (optional)
    return getres.data; // Return the response data
  } catch (error) {
    return { error }; // Return error object
  }
};

// Function to perform a POST request specifically for login actions
export const postLoginApihandler = async (endPoint, value) => {
  try {
    const postRes = await axios.post(serverUrl + endPoint, value); // Send POST request with login data
    // console.log("apipost=>", postRes); // Debug log (optional)
    return postRes.data; // Return the response data
  } catch (error) {
    return { error }; // Return error object
  }
};

// Function to perform a general POST request
export const postApihandler = async (endPoint, value) => {
  console.log("postvalue=>", endPoint); // Debug log for endpoint
  console.log("postvalue=>", value);    // Debug log for data being sent
  try {
    const postRes = await axios.post(serverUrl + endPoint, value); // Send POST request with data
    console.log("apipost=>", postRes);  // Debug log for full response
    return postRes.data; // Return the response data
  } catch (error) {
    return { error }; // Return error object
  }
};

// Function to perform a DELETE request to remove a resource
export const deleteApihandler = async (endPoint) => {
  try {
    const deleteRes = await axios.delete(serverUrl + endPoint); // Send DELETE request
    return deleteRes.data; // Return the response data
  } catch (error) {
    return { error }; // Return error object
  }
};

// Function to perform a PUT request to update a resource
export const putApihandler = async (endPoint, value) => {
  console.log("endPoint--->", endPoint); // Debug log for endpoint
  console.log("value------>", value);    // Debug log for data being sent
  try {
    // Axios PUT request to update existing data
    const res = await axios.put(serverUrl + endPoint, value);
    return res.data; // Return updated data
  } catch (error) {
    return { error }; // Return error object
  }
};

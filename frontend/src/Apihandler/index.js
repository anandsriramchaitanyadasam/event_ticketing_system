/** @format */

import axios from "axios";

// ✅ Base URL for your backend API
export const serverUrl = "http://event-ticketing-backend-env.eba-ps2zgbhw.us-east-1.elasticbeanstalk.com/api";


// ✅ Helper function to format dates into readable format
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

// ✅ GET request handler for generic endpoints
export const getApihandler = async (endPoint) => {
  try {
    const getres = await axios.get(serverUrl + endPoint);
    return getres.data;
  } catch (error) {
    return { error };
  }
};

// ✅ GET request handler for fetching by ID
export const getbyidApihandler = async (endPoint) => {
  try {
    const getres = await axios.get(serverUrl + endPoint);
    return getres.data;
  } catch (error) {
    return { error };
  }
};

// ✅ POST request specifically for login (optional separation)
export const postLoginApihandler = async (endPoint, value) => {
  try {
    const postRes = await axios.post(serverUrl + endPoint, value);
    return postRes.data;
  } catch (error) {
    return { error };
  }
};

// ✅ Generic POST request handler (e.g., adding events, categories, etc.)
export const postApihandler = async (endPoint, value) => {
  try {
    const postRes = await axios.post(serverUrl + endPoint, value);
    console.log("apipost=>", postRes); // 🔍 Debug log
    return postRes.data;
  } catch (error) {
    return { error };
  }
};

// ✅ DELETE request handler
export const deleteApihandler = async (endPoint) => {
  try {
    const deleteRes = await axios.delete(serverUrl + endPoint);
    return deleteRes.data;
  } catch (error) {
    return { error };
  }
};

// ✅ PUT request handler for updating data
export const putApihandler = async (endPoint, value) => {
  console.log("endPoint--->", endPoint); // 🔍 Debug log
  console.log("value------>", value);   // 🔍 Debug log
  try {
    const res = await axios.put(serverUrl + endPoint, value);
    return res.data;
  } catch (error) {
    return { error };
  }
};

<<<<<<< HEAD
import axios from "axios";

export const serverUrl = "http://localhost:80/api";
=======
/** @format */

import axios from "axios";

export const serverUrl = "http://localhost:80/api";
// export const serverUrl = "https://maalikdesigner.com/api";
// export const serverUrl = "http://51.20.106.9/api";
export const awsUrl = "https://maalikdesigners3.s3.eu-north-1.amazonaws.com/";
// export const imageUrl = "https://raadharani.s3.ap-south-1.amazonaws.com/";
>>>>>>> 4470dcc363f614e28f589f2214d595ce2d6d96a7

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

export const getApihandler = async (endPoint) => {
  try {
    const getres = await axios.get(serverUrl + endPoint);
    return getres.data;
  } catch (error) {
    return { error };
  }
};

export const getbyidApihandler = async (endPoint) => {
  try {
    const getres = await axios.get(serverUrl + endPoint);
<<<<<<< HEAD
=======
    // console.log("getresbyid=>", getres);
>>>>>>> 4470dcc363f614e28f589f2214d595ce2d6d96a7
    return getres.data;
  } catch (error) {
    return { error };
  }
};

export const postLoginApihandler = async (endPoint, value) => {
  try {
    const postRes = await axios.post(serverUrl + endPoint, value);
<<<<<<< HEAD
=======
    // console.log("apipost=>", postRes);
>>>>>>> 4470dcc363f614e28f589f2214d595ce2d6d96a7
    return postRes.data;
  } catch (error) {
    return { error };
  }
};

export const postApihandler = async (endPoint, value) => {
  console.log("postvalue=>", endPoint);
  console.log("postvalue=>", value);
  try {
    const postRes = await axios.post(serverUrl + endPoint, value);
    console.log("apipost=>", postRes);
    return postRes.data;
  } catch (error) {
    return { error };
  }
};

export const deleteApihandler = async (endPoint) => {
  try {
    const deleteRes = await axios.delete(serverUrl + endPoint);
    return deleteRes.data;
  } catch (error) {
    return { error };
  }
};

export const putApihandler = async (endPoint, value) => {
<<<<<<< HEAD
  
=======
  console.log("endPoint--->", endPoint);
  console.log("value------>", value);
>>>>>>> 4470dcc363f614e28f589f2214d595ce2d6d96a7
  try {
    // Axios Method ----
    const res = await axios.put(serverUrl + endPoint, value);
    return res.data;

<<<<<<< HEAD
    
=======
    // Fetch Method ----
    // const res = await fetch(serverUrl + endPoint, {
    //   method: "put",
    //   body: JSON.stringify(value),
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Content-Type": "application/json",
    //   },
    // });
    // return res.data;
>>>>>>> 4470dcc363f614e28f589f2214d595ce2d6d96a7
  } catch (error) {
    // console.log("error ");
    return { error };
  }
};

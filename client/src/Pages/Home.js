import React from "react";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { useState, useEffect, useReducer } from "react";

export const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("localhost:5000/api/books").then((res) => console.log(res));
  }, []);
  return (
    <>
      <Navbar />
    </>
  );
};

import React from "react";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { useEffect, useReducer } from "react";

const initialState = {
  loading: true,
  error: "",
  books: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        loading: false,
        error: "",
        books: action.payload,
      };
    case "FETCH_ERROR":
      return {
        loading: true,
        error: "gg",
        books: {},
      };
    default:
      return state;
  }
};

export const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books")
      .then((response) => {
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      })
      .catch(() => {
        dispatch({ type: "FETCH_ERROR" });
      });
  }, []);

  return (
    <>
      <Navbar />
      {state.loading ? "loading..." : "books"}
    </>
  );
};

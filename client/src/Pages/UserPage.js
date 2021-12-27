import React from "react";
import { Navbar } from "../components/Navbar";
import { useEffect } from "react";
import axios from "axios";

export const UserPage = () => {
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user_data", { withCredentials: true })
      .then((res) => console.log(res));
  }, []);
  return (
    <>
      <Navbar main={true} />
      user page
    </>
  );
};

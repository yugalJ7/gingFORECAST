import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useState } from "react";

const RootLayout = () => {
  const [temp, setTemp] = useState("hiyouarethere");
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default RootLayout;

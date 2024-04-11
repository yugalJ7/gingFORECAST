import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default RootLayout;

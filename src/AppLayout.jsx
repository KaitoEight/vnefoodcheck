// AppLayout.jsx
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Loading from "./Loading";
import Navbar from "../src/components/Hero/Navbar";
import Footer from "../src/components/Hero/Footer";

const AppLayout = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust the timeout duration as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div>{isLoading ? <Loading /> : null}</div>
      {isLoading ? null : (
        <>
          <Navbar />
          <div>
            <Outlet />
          </div>
        </>
      )}
    </>
  );
};

export default AppLayout;

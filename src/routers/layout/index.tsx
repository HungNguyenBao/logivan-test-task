import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main id="app">
      <Outlet />
    </main>
  );
};

export default Layout;

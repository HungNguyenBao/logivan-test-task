import React from "react";
import { Routes as AppRoutes, Route } from "react-router-dom";
import Layout from "./layout";
import Home from "pages/Home";

const Routers = () => {
  return (
    <AppRoutes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </AppRoutes>
  );
};

export default Routers;
